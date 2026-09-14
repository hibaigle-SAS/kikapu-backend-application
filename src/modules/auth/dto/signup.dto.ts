import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
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
    example: '5463389',
    required: false,
  })
  @IsOptional()
  @IsString()
  sponsorReferalCode?: string;
}
