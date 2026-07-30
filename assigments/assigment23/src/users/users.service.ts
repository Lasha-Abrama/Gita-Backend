import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersQueryDto } from './dtos/user-query.dto';

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  getUsers({ page, take, gender, email }: UsersQueryDto) {
    let data = [...this.users];

    if (gender) {
      data = data.filter((user) =>
        user.gender.toLowerCase().startsWith(gender.toLowerCase()),
      );
    }

    if (email) {
      data = data.filter((user) =>
        user.email.toLowerCase().startsWith(email.toLowerCase()),
      );
    }

    const total = data.length;

    const start = (page - 1) * take;
    const stop = page * take;

    data = data.slice(start, stop);

    return {
      users: data,
      total,
      page,
      limit: take,
    };
  }

  getUserById(userId: number): IUser {
    const user = this.users.find((currentUser) => currentUser?.id === userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  getUserByEmail(email: string): IUser | undefined {
    return this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  createUser(createUserDto: CreateUserDto): IUser {
    const lastId = Math.max(0, ...this.users.map((user) => user.id));

    const subscriptionStartDate = new Date();

    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const newUser = {
      id: lastId + 1,
      ...createUserDto,
      subscriptionStartDate: subscriptionStartDate.toISOString(),
      subscriptionEndDate: subscriptionEndDate.toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }

  deleteUserById(userId: number): IUser {
    const index = this.users.findIndex(
      (currentUser) => currentUser.id === userId,
    );

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }

  upgradeSubscription(email: string) {
    const user = this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const subscriptionEndDate = new Date(user.subscriptionEndDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    user.subscriptionEndDate = subscriptionEndDate.toISOString();

    return {
      message: 'Subscription upgraded successfully',
      user,
    };
  }

  updateUserById(userId: number, updateUserDto: UpdateUserDto): IUser {
    const index = this.users.findIndex(
      (currentUser) => currentUser.id === userId,
    );

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
      id: this.users[index].id,
    };

    return this.users[index];
  }
}
