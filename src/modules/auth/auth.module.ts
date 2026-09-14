import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessLevelModule } from '../access-level/access-level.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), AccessLevelModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
