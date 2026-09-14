import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UsersService } from '../users/users.service';
import {
  AddPasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  UpdatePasswordDto,
  VerifyOtpDto,
} from './dto';
import { DatabaseService } from '../../database/database.service';
import { CreateGoogleUserDto } from '../users/dto';
import { AccessLevelService } from '../access-level/access-level.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly databaseService: DatabaseService,
    private readonly accessLevelService: AccessLevelService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateGoogleUser(googleUser: CreateGoogleUserDto) {
    const user = await this.usersService.findUserByEmailAddress(
      googleUser.email,
    );
    if (user) return user;

    const defaultRole = await this.accessLevelService.fetchRoleByCode();
    if (!defaultRole) return new InternalServerErrorException('Erreur de role');

    const createdUser = await this.usersService.createUser({
      fullName: `${googleUser.firstName}`,
      roleId: defaultRole.id,
      photo: googleUser.avatarUrl,
      emailAddress: googleUser.email,
      permissions: [],
    });

    const result = await this.usersService.findUserByEmailAddress(
      createdUser.user.emailAddress,
    );

    return result;
  }

  async singin(dto: SignInDto) {
    const user = await this.databaseService.users.findFirst({
      where: {
        countryCode: dto.countryCode,
        phone: dto.phone,
      },

      include: {
        role: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('Téléphone ou mot de passe incorrect');

    if (user.isDeactivated)
      throw new UnauthorizedException(
        "Ce compte a déjà été déasactivé, veuillez contacter l'administrateur pour plus de détails",
      );

    const verified = await argon.verify(user.password, dto.password);
    if (!verified)
      throw new UnauthorizedException('Téléphone ou mot de passe incorrect');

    const accessToken = await this.signToken(user.id);
    delete user.password;

    return {
      statusCode: HttpStatus.ACCEPTED,
      data: user,
      accessToken,
    };
  }

async addPassword(dto: AddPasswordDto) {
    // Find the user
    const user = await this.usersService.findById(dto.userId);
    if (!user) throw new NotFoundException('User does not exist');

    // Remove the otp code since we no longer need it
    await this.databaseService.otpCodes.delete({
      where: {
        countryCode_phone: {
          countryCode: user.countryCode,
          phone: user.phone,
        },
      },
    });

    // // Let's hash the password
    const hash = await argon.hash(dto.password);
    await this.usersService.updatePwd(dto.userId, hash);

    const accessToken = await this.signToken(user.id);

    return {
      data: user,
      accessToken,
    };
  }

  async signUp(dto: SignUpDto) {
    const { countryCode, phone, sponsorReferalCode } = dto;
    const defaultRole = await this.accessLevelService.defaultRole();

    // If we get the same phone number in otp code table we should remove it
    // we can't have the same phone number twice in that db
    const existingNumberInOtpCodeTable =
      await this.databaseService.otpCodes.findFirst({
        where: {
          countryCode: dto.countryCode,
          phone: dto.phone,
        },
      });

    if (existingNumberInOtpCodeTable) {
      await this.databaseService.otpCodes.deleteMany({
        where: {
          countryCode: dto.countryCode,
          phone: dto.phone,
        },
      });
    }

    const otpCode = await this.generateUniqueOtpCode();
    this.logger.debug(`OTP-CODE :${otpCode}`);

    const userExist = await this.usersService.findUserByPhone(
      dto.countryCode,
      dto.phone,
    );

    if (userExist) {
      if (userExist.otpVerified) {
        return {
          message: 'Vous avez déjà un compte, vous pouvez vous connecter',
        };
      }

      await this.databaseService.otpCodes.create({
        data: {
          code: otpCode,
          countryCode: dto.countryCode,
          phone: dto.phone,
        },
      });

      try {
        // Promise.allSettled([
        //   // send SMS
        //   this.smsService.sendSms({
        //     phone: dto.phone,
        //     message: `Votre code de confirmation est ${otpCode}`,
        //   }),
        // ]);
      } catch (notifyErr) {
        this.logger.error('Notification failed', notifyErr);
      }

      return {
        message: `Code envoyé au ${dto.countryCode}${dto.phone}`,
        userId: userExist.id,
      };
    }

    const result = await this.databaseService.$transaction(async (tx) => {
      const user = await this.usersService.createUser(
        {
          ...(countryCode !== undefined && { countryCode }),
          ...(phone !== undefined && { phone }),
          ...(sponsorReferalCode !== undefined && { sponsorReferalCode }),
          roleId: defaultRole.id,
          permissions: defaultRole.rolePermissions.map((v) => ({
            permissionId: v.permission.id,
          })),
        },
        tx,
      );

      await tx.otpCodes.create({
        data: {
          code: otpCode,
          countryCode: dto.countryCode,
          phone: dto.phone,
        },
      });

      return {
        user: user.user,
      };
    });

    try {
      // Promise.allSettled([
      //   // send SMS
      //   this.smsService.sendSms({
      //     phone: dto.phone,
      //     message: `Votre code de confirmation est ${otpCode}`,
      //   }),
      // ]);
    } catch (notifyErr) {
      this.logger.error('Notification failed', notifyErr);
    }

    return {
      message: `Code envoyé au ${dto.countryCode}${dto.phone}`,
      userId: result.user.id,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.databaseService.users.findUnique({
      where: {
        countryCode_phone: {
          countryCode: dto.countryCode,
          phone: dto.phone,
        },
      },
    });

    if (!user) throw new UnauthorizedException('Le OTP code est introuvable');

    // // Find the otp code now
    const otpCodeResult = await this.databaseService.otpCodes.findFirst({
      where: { code: dto.code, countryCode: dto.countryCode, phone: dto.phone },
    });

    if (!otpCodeResult)
      throw new UnauthorizedException('Le OTP code est introuvable');

    // Check if it's older than 15 minutes
    const createdAt = otpCodeResult.createdAt.getTime(); // convert to timestamp
    const now = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;

    if (now - createdAt > fifteenMinutesInMs) {
      // Delete the expired code
      await this.databaseService.otpCodes.delete({
        where: { id: otpCodeResult.id },
      });

      throw new UnauthorizedException('Le code OTP a déjà expiré');
    }

    if (otpCodeResult.code !== dto.code)
      throw new UnauthorizedException('Le OTP code est introuvable');

    // Update user verified status
    const updatedUser = await this.databaseService.users.update({
      data: { otpVerified: true },
      where: { id: user.id },
    });

    return updatedUser;
  }

  async updatePassword(dto: UpdatePasswordDto) {
    // cheking the old  password first
    const userExist = await this.usersService.userExist(dto.id);
    if (!userExist) throw new NotFoundException("L'utilisateur n'existe pas");

    const verified = await argon.verify(userExist.password, dto.oldPassword);
    if (!verified)
      throw new NotFoundException("L'ancien mot de passe ne correspond pas");

    // let's hash the password first
    const hash = await argon.hash(dto.newPassword);

    const result = await this.usersService.updateUsers({
      id: dto.id,
      password: hash,
    });

    delete result.password;
    return {
      message: 'Mot de passe modifiée avec succèes',
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    // Delete everything relating to the old code
    const otpCodesExist = await this.databaseService.otpCodes.findUnique({
      where: {
        countryCode_phone: {
          countryCode: dto.countryCode,
          phone: dto.phone,
        },
      },
    });

    if (otpCodesExist)
      await this.databaseService.otpCodes.delete({
        where: {
          countryCode_phone: {
            countryCode: dto.countryCode,
            phone: dto.phone,
          },
        },
      });

    // Find user first
    const user = await this.databaseService.users.findFirst({
      where: {
        countryCode: dto.countryCode,
        phone: dto.phone,
      },
      omit: {
        password: true,
      },
    });

    if (!user)
      throw new UnauthorizedException(
        'Numero de téléphone introuvable, veuillez créer un compte SVP !',
      );

    const otpCode = await this.generateUniqueOtpCode();
    this.logger.debug(otpCode);

    // Create OTP code
    await this.databaseService.otpCodes.create({
      data: {
        code: otpCode,
        phone: dto.phone,
      },
    });

    // this.smsService.sendSms({
    //   phone: dto.phone,
    //   message: `Votre code de confirmation est ${otpCode}`,
    // });
    // .then((c) => this.logger.log(c));

    return { message: `Code envoyé au ${dto.phone}`, user };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // Find user first
    const user = await this.databaseService.users.findFirst({
      where: {
        countryCode: dto.countryCode,
        phone: dto.phone,
      },
      omit: {
        password: true,
      },
      include: {
        role: true,
      },
    });

    const otpCodeResult = await this.databaseService.otpCodes.findFirst({
      where: {
        code: dto.code,
        phone: dto.phone,
      },
    });

    if (!otpCodeResult)
      throw new UnauthorizedException(
        'Numero de téléphone introuvable, veuillez créer un compte SVP !',
      );

    if (!user)
      throw new UnauthorizedException(
        'Numero de téléphone introuvable, veuillez créer un compte SVP !',
      );

    const hash = await argon.hash(dto.newPassword);
    const updatedUser = await this.databaseService.users.update({
      where: {
        id: user.id,
      },
      data: { password: hash },
      omit: {
        password: true,
      },
    });

    // Delete the existing OTP code
    await this.databaseService.otpCodes.delete({
      where: {
        countryCode_phone: { countryCode: user.countryCode, phone: user.phone },
      },
    });

    return { ...updatedUser };
  }

  signToken(userId: string) {
    const payload = { userId };
    const privateKey = this.config.get('ACCESS_TOKEN_PRIVATE_KEY');
    return this.jwt.signAsync(payload, {
      expiresIn: '1y',
      secret: privateKey,
    });
  }

  async generateUniqueOtpCode() {
    let code: string;
    let exists = true;

    while (exists) {
      // Generate a random 6-digit string with leading zeros
      code = Math.floor(1000 + Math.random() * 9000).toString();

      // Check if code already exists
      const otpCode = await this.databaseService.otpCodes.findUnique({
        where: { code },
      });

      exists = !!otpCode;
    }

    return code;
  }
}
