import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordDto {
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
}
