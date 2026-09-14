import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RolePermissionDto {
  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class RoleDto {
  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
    required: false,
  })
  @IsOptional()
  @IsString()
  createdById: '48c045ba-afc4-44ad-91bf-25d8b1a69092';

  @ApiProperty({
    example: 'super-admin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'sa',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: [RolePermissionDto],
  })
  @ValidateNested({ each: true })
  @Type(() => RolePermissionDto)
  permissions: RolePermissionDto[];
}
