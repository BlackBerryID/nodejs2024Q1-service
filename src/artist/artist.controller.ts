import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.artistService.findOne(id);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        `artist with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const response = this.artistService.update(id, updateArtistDto);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        `artist with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.artistService.remove(id);

    if (!response) {
      throw new HttpException(
        `artist with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
