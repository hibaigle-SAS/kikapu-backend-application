import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CompanyEvaluationDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  validated: boolean;

  @ApiProperty({
    example: 100000.878,
  })
  @IsNumber()
  companyNetWorth: number;

  @ApiProperty({
    required: false,
    example: 'test raison',
  })
  @IsOptional()
  @IsString()
  reason: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  validatedById: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  currencyId: string;
}
