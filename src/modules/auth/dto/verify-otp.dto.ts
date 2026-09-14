import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: '+243',
  })
  @IsString()
  countryCode: string;

  @ApiProperty({
    example: '971945367',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '1234',
  })
  @IsString()
  code: string;
}
