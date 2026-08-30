import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpgradeSubscriptionDto } from './dtos/upgrade-subscription.dto';
import { UsersQueryDto } from './dtos/user-query.dto';
import { UsersService } from './users.service';
import { IsValidObjectId } from '../common/dtos/is-valid-object-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll(@Query() queryDto: UsersQueryDto) {
    return this.usersService.getUsers(queryDto);
  }

  @Patch('upgrade-subscription')
  upgradeSubscription(@Body() { email }: UpgradeSubscriptionDto) {
    return this.usersService.upgradeSubscription(email);
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IsValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId) {
    return this.usersService.deleteUserById(id);
  }
}
