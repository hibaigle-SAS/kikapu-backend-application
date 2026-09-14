import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResendOtpDto {
  @ApiProperty({
    example: '+243976633452',
  })
  @IsString()
  phone: string;
}
