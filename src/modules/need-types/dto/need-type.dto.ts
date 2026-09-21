import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class NeedTypeDto {
  @ApiProperty({
    example: 'test name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '48c045ba-afc4-44ad-91bf-25d8b1a69092',
  })
  @IsUUID()
  createdById: string;
}
