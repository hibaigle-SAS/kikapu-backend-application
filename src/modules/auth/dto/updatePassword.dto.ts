import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'e9801cc9-6221-43e5-a92a-40e518d2695f',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: '4444444',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
