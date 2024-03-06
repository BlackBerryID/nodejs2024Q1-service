import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  oldPassword: string; // previous password

  @ApiProperty()
  @IsString()
  newPassword: string; // new password
}
