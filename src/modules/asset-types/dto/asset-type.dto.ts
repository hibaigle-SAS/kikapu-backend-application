import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssetTypeDto {
  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsString()
  createdById: '48c045ba-afc4-44ad-91bf-25d8b1a69092';

  @ApiProperty({
    example: 'Enseignanrt',
  })
  @IsString()
  name: string;
}
