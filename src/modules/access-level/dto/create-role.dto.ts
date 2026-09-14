import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateRolesDto {
  @ApiProperty({
    example: 'super-admin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2233445544',
  })
  @IsString()
  @MaxLength(10)
  code: string;
}
