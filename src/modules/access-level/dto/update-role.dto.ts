import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRolesDto } from './create-role.dto';

export class UpdateRolesDto extends PartialType(CreateRolesDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
