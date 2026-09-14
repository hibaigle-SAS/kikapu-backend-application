import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: '+243',
  })
  @IsString()
  countryCode: string;

  @ApiProperty({
    example: '976633452',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '1234',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'ex@mplep@ssword',
  })
  @IsString()
  newPassword: string;
}
