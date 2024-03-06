import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.userService.findOne(id);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        `user with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const response = this.userService.update(id, updateUserDto);

    if (response) {
      if (response === 'wrong password') {
        throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
      }
      return response;
    } else {
      throw new HttpException(
        `user with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = this.userService.remove(id);

    if (!response) {
      throw new HttpException(
        `user with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
