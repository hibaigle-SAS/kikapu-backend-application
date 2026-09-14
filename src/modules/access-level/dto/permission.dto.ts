import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class PermissionDto {
  @ApiProperty({
    example: 'create-school',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'cs',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'a6d29235-868d-416c-86fb-076fa0ac0341',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById: string;
}

export class PermissionsListDto {
  @ApiProperty({
    example: 'a6d29235-868d-416c-86fb-076fa0ac0341',
  })
  @IsUUID()
  permissionId: string;
}

export class CreatePermissionsDto {
  @ApiProperty({
    type: [PermissionDto],
    example: [
      {
        createdById: 'a6d29235-868d-416c-86fb-076fa0ac0341',
        name: 'Permission name',
        code: 'p',
      },
    ],
  })
  @ValidateNested()
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
