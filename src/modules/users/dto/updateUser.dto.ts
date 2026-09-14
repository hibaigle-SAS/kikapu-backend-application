import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUsersDto } from './createUser';

export class UpdateUserDto extends PartialType(CreateUsersDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
