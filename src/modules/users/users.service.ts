import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as argon from 'argon2';
import buildFilters from '../../tools/build-filters';
import { DatabaseService } from '../../database/database.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private readonly logger = new Logger(UsersService.name);

  async fetchUsers(page: number, limit: number, roleId?: string) {
    const where = buildFilters({ roleId });

    const count = await this.databaseService.users.count({ where: { roleId } });
    const result = await this.databaseService.users.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
      where,
      include: {
        role: true,
      },
    });

    return {
      count,
      data: result,
    };
  }

  async search(page: number, limit: number, term: string, roleId?: string) {
    try {
      const filters = buildFilters({ roleId });
      const count = await this.databaseService.users.count({
        where: {
          ...filters,
          OR: [
            {
              fullName: { contains: term, mode: 'insensitive' },
            },
            {
              phone: { contains: term, mode: 'insensitive' },
            },
          ],
        },
      });
      const result = await this.databaseService.users.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        where: {
          ...filters,
          OR: [
            {
              fullName: { contains: term, mode: 'insensitive' },
            },
            {
              phone: { contains: term, mode: 'insensitive' },
            },
          ],
        },
        include: {
          role: true,
          createdBy: {
            omit: { password: true },
          },
        },
      });

      return {
        count,
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async fetchAgents(page: number, limit: number, roleId?: string) {
    const where = buildFilters({ roleId });

    const count = await this.databaseService.users.count({ where });
    const result = await this.databaseService.users.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where,
      omit: { password: true },
      include: {
        role: true,
      },
    });

    return {
      count,
      data: result,
    };
  }

  async findUserByEmailAddress(emailAddress: string) {
    // if (!emailAddress) {
    //   this.logger.warn('findUserByEmailAddress called with undefined email');
    //   return null;
    // }
    const result = await this.databaseService.users.findUnique({
      where: {
        emailAddress,
      },
      include: {
        role: true,
      },
    });

    return result;
  }

  async createUser(dto: CreateUsersDto, prismaTx?: Prisma.TransactionClient) {
    try {
      const { password, permissions, userTypeId, ...userDto } = dto;

      const hash = dto.password ? await argon.hash(dto.password) : undefined;
      const client = prismaTx ?? this.databaseService;
      const result = dto.password
        ? await client.users.create({
            data: {
              ...userDto,
              ...(userTypeId != null ? { userTypeId } : {}),
              password: hash,
            },
          })
        : await client.users.create({
            data: {
              ...userDto,
              ...(userTypeId != null ? { userTypeId } : {}),
            },
          });

      delete result.password;
      return {
        user: result,
      };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ConflictException('Infornations déjà utilisé');
        }
      }
      throw error;
    }
  }

  async updateUsers(dto: UpdateUserDto) {
    const { fullName } = dto;
    const result = await this.databaseService.users.update({
      where: {
        id: dto.id,
      },
      data: {
        fullName,
      },
    });

    delete result.password;
    return result;
  }

  async deactivateOrActivateUser(id: string) {
    try {
      const user = await this.databaseService.users.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException('Utilisateur introuvable');

      const result = await this.databaseService.users.update({
        where: { id },
        data: { isDeactivated: !user.isDeactivated },
      });

      delete result.password;
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async userExist(id: string) {
    const result = await this.databaseService.users.findFirst({
      where: { id },
    });
    return result;
  }

  async findUserByPhone(countryCode: string, phone: string) {
    const result = await this.databaseService.users.findFirst({
      where: {
        countryCode,
        phone: phone,
      },
      include: {
        role: true,
      },
    });

    return result;
  }

  async count() {
    const result = await this.databaseService.users.count();
    return result;
  }

  async updatePwd(
    id: string,
    pwdHash: string,
    prismaTx?: Prisma.TransactionClient,
  ) {
    const client = prismaTx ?? this.databaseService;
    const result = await client.users.update({
      data: { password: pwdHash },
      where: { id },
    });

    delete result.password;

    return {
      user: result,
    };
  }

  async findById(userId: string, fromController?: boolean) {
    const result = await this.databaseService.users.findUnique({
      where: { id: userId },
      include: {
        role: true,
        userPermissions: {
          select: {
            permission: true,
          },
        },
      },
    });

    if (fromController) {
      delete result.password;
    }

    if (!result) throw new NotFoundException();

    return result;
  }
}
