import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.favoritesService.addTrack(id);

    if (!response) {
      throw new HttpException(
        `track with id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.favoritesService.removeTrack(id);

    if (!response) {
      throw new HttpException(
        `track with id ${id} is not favorite one`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.favoritesService.addAlbum(id);

    if (!response) {
      throw new HttpException(
        `album with id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.favoritesService.removeAlbum(id);

    if (!response) {
      throw new HttpException(
        `album with id ${id} is not favorite one`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.favoritesService.addArtist(id);

    if (!response) {
      throw new HttpException(
        `artist with id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.favoritesService.removeArtist(id);

    if (!response) {
      throw new HttpException(
        `artist with id ${id} is not favorite one`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
