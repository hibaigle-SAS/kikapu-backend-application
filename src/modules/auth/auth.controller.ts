import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AddPasswordDto,
  SignInDto,
  SignUpDto,
  UpdatePasswordDto,
  VerifyOtpDto,
} from './dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({
    summary: 'This API allows the user to verify the otp',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('verify-otp')
  verifyOtp(@Body(ValidationPipe) verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({
    summary: 'The api to call for adding a password',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('add-password')
  addPassword(@Body(ValidationPipe) dto: AddPasswordDto) {
    return this.authService.addPassword(dto);
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.singin(signInDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('update-password')
  updateUserPassword(@Body(ValidationPipe) dto: UpdatePasswordDto) {
    return this.authService.updatePassword(dto);
  }
}
