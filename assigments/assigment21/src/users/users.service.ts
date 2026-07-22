import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      firstName: 'Giorgi',
      lastName: 'Abramishvili',
      email: 'giorgi@gmail.com',
      phoneNumber: 591104147,
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Lasha',
      lastName: 'Gamkhitashvili',
      email: 'lasha@gmail.com',
      phoneNumber: 568121390,
      gender: 'Male',
    },
  ];

  getUsers(): IUser[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto): IUser {
    const lastId = Math.max(0, ...this.users.map((user) => user.id));

    const newUser: IUser = {
      ...createUserDto,
      id: lastId + 1,
    };

    this.users.push(newUser);
    return newUser;
  }

  getUserById(userId: number): IUser {
    const user = this.users.find((currentUser) => currentUser.id === userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  deleteUserById(userId: number): IUser {
    const index = this.users.findIndex(
      (currentUser) => currentUser.id === userId,
    );

    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }

  updateUserById(userId: number, updateUserDto: UpdateUserDto): IUser {
    const index = this.users.findIndex(
      (currentUser) => currentUser.id === userId,
    );

    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
      id: this.users[index].id,
    };

    return this.users[index];
  }
}
