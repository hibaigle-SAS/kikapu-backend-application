import { PermissionsListDto } from '@/modules/access-level/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Genders } from '../../../../generated/prisma/client';

export class CreateUsersDto {
  @ApiProperty({
    example: 'kalala',
    required: false,
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    example: '+243',
    required: false,
  })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiProperty({
    example: '971945367',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'test1@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  emailAddress?: string;

  @ApiProperty({
    example: 'img.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    example: '1234',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: '1f70a833-f92e-448d-b8f2-03d4921b4909',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiProperty({
    example: '1f70a833-f92e-448d-b8f2-03d4921b4909',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  @ApiProperty({
    example: '1f70a833-f92e-448d-b8f2-03d4921b4909',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userTypeId?: string;

  @ApiProperty({
    example: 'MALE',
    description: 'authorized genres MALE | FEMALE',
    required: false,
  })
  @IsEnum(Genders)
  gender?: Genders;

  @ApiProperty({
    example: '5463389',
    required: false,
  })
  @IsOptional()
  @IsString()
  sponsorReferalCode?: string;

  @ApiProperty({
    example: [
      {
        permissionId: '13ea8d13-d7a5-4f7f-a56b-a0377f755b38',
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => PermissionsListDto)
  permissions: PermissionsListDto[];
}
