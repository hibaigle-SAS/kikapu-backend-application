import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: '1234',
  })
  @IsString()
  password: string;

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
}
