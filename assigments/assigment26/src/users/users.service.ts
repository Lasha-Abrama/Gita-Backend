import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersQueryDto } from './dtos/user-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UserGender } from './enums/user-gender.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async getUsers({ page, take, gender, email }: UsersQueryDto) {
    const filter: { email?: string; gender?: UserGender } = {};

    if (gender) {
      filter.gender = gender === 'm' ? UserGender.Male : UserGender.Female;
    }

    if (email) {
      filter.email = email.toLowerCase();
    }

    const users = await this.userModel
      .find(filter)
      .skip((page - 1) * take)
      .limit(take);
    const total = await this.userModel.countDocuments(filter);

    return {
      users,
      total,
      page,
      limit: take,
    };
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }

  async createUser(createUserDto: CreateUserDto) {
    const email = createUserDto.email.toLowerCase();
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists');
    }

    const subscriptionStartDate = new Date();

    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const password = await bcrypt.hash(createUserDto.password, 10);

    return this.userModel.create({
      ...createUserDto,
      password,
      email,
      subscriptionStartDate,
      subscriptionEndDate,
      isActive: true,
    });
  }

  async getStatistics() {
    return this.userModel.aggregate<{
      gender: UserGender;
      averageAge: number | null;
    }>([
      {
        $group: {
          _id: '$gender',
          averageAge: { $avg: '$age' },
        },
      },
      {
        $project: {
          _id: 0,
          gender: '$_id',
          averageAge: { $ifNull: ['$averageAge', null] },
        },
      },
      { $sort: { gender: 1 } },
    ]);
  }

  async deleteUserById(userId: string, currentUserId: string) {
    if (userId !== currentUserId) {
      throw new ForbiddenException('You can only delete your own account');
    }

    const user = await this.userModel.findByIdAndDelete(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async upgradeSubscription(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const subscriptionEndDate = new Date(user.subscriptionEndDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    user.subscriptionEndDate = subscriptionEndDate;
    await user.save();

    return {
      message: 'Subscription upgraded successfully',
      user,
    };
  }

  async updateUserById(
    userId: string,
    updateUserDto: UpdateUserDto,
    currentUserId: string,
  ) {
    if (userId !== currentUserId) {
      throw new ForbiddenException('You can only update your own account');
    }

    const updateData = { ...updateUserDto };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await this.userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  addExpenseToUser(userId: string, expenseId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      $push: { expenses: expenseId },
    });
  }

  removeExpenseFromUser(userId: string, expenseId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      $pull: { expenses: expenseId },
    });
  }
}
