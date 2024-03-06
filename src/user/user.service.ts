import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';
import { User } from './interfaces';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    db.users.push(newUser);

    return omit(newUser, 'password');
  }

  findAll() {
    return db.users;
  }

  findOne(id: string) {
    return db.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = db.users.find((user) => user.id === id);
    if (!user) return null;
    if (user.password !== updateUserDto.oldPassword) return 'wrong password';

    const updatedUser: User = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    db.users = db.users.map((user) => (user.id === id ? updatedUser : user));

    return omit(updatedUser, 'password');
  }

  remove(id: string) {
    const user = db.users.find((user) => user.id === id);
    if (!user) return null;

    db.users = db.users.filter((user) => user.id !== id);

    return true;
  }
}
