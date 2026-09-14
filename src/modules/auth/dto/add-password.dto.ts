import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPasswordDto {
  @ApiProperty({
    example: '7e3934b9-0f25-4f4b-837f-22252c6c3ede',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
