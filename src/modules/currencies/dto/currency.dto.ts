import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CurrencyDto {
  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  createdById: string;

  @ApiProperty({
    example: 'cdf',
  })
  @IsString()
  accronym: string;

  @ApiProperty({
    example: 'francs congolais',
  })
  @IsString()
  name: string;

  // @ApiProperty({
  //   example: false,
  //   required: false,
  // })
  // @IsOptional()
  // @IsBoolean()
  // active: boolean;
}
