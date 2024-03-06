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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.albumService.findOne(id);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        `album with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const response = this.albumService.update(id, updateAlbumDto);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        `album with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.albumService.remove(id);

    if (!response) {
      throw new HttpException(
        `album with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
