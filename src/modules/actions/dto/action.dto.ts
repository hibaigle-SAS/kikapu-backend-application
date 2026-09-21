import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ActionDto {
  @ApiProperty({
    example: 'test name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'test description',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  description: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  createdById: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  actionCategoryId: string;
  
  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  actionTypeId: string;
}
