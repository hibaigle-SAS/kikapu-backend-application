import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';

class CompanyAssetTypeDetailsDto {
  @ApiProperty({
    example: 'test name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: '2026-01-01',
  })
  @IsString()
  acquisitionDate: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  currencyId: string;
}

class CompanyAssetTypeDto {
  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  assetTypeId: string;

  @ApiProperty({
    type: [CompanyAssetTypeDetailsDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CompanyAssetTypeDetailsDto)
  companyAssetTypeDetails: CompanyAssetTypeDetailsDto[];
}

export class CompanyDto {
  @ApiProperty({
    example: 'AADDJJ2722',
  })
  @IsString()
  rccm: string;

  @ApiProperty({
    example: '22552627',
  })
  @IsString()
  idNat: string;

  @ApiProperty({
    example: 'AADDJJ2722',
  })
  @IsString()
  numeroImpot: string;

  @ApiProperty({
    example: '2026-01-01',
  })
  @IsString()
  creationDate: string;

  @ApiProperty({
    example: 'https://medias/lastThreeYearsFinanceReport.jpg',
  })
  @IsString()
  lastThreeYearsFinanceReport: string;

  @ApiProperty({
    example: 300,
  })
  @IsNumber()
  numberOfEmployees: number;

  @ApiProperty({
    example: 7500.367,
  })
  @IsNumber()
  revenue: number;

  @ApiProperty({
    example: 'https://medias/lastThreeYearsFinanceReport.jpg',
  })
  @IsString()
  incomeStatement: string;

  @ApiProperty({
    example: 7500.367,
  })
  @IsNumber()
  shareCapital: number;

  @ApiProperty({
    example: 7500.367,
  })
  @IsNumber()
  initialOutcome: number;

  @ApiProperty({
    example: 7500.367,
  })
  @IsNumber()
  actionCount: number;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  createdById: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  ownerId: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  companyTypeId: string;

  @ApiProperty({
    type: [CompanyAssetTypeDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CompanyAssetTypeDto)
  companyAssetTypes: CompanyAssetTypeDto[];
}
