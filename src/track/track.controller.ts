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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.trackService.findOne(id);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        `track with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const response = this.trackService.update(id, updateTrackDto);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        `track with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.trackService.remove(id);

    if (!response) {
      throw new HttpException(
        `track with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
