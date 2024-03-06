import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  artistId: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  albumId: string | null;

  @ApiProperty()
  @IsInt()
  duration: number;
}
