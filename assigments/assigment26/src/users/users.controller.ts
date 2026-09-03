import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersQueryDto } from './dtos/user-query.dto';
import { UsersService } from './users.service';
import { IsValidObjectId } from '../common/dtos/is-valid-object-id.dto';
import { IsAuthGuard } from '../guards/is-auth.guard';
import { WriteThrottle } from '../common/decorators/write-throttle.decorator';

@Controller('users')
@UseGuards(IsAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @WriteThrottle()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll(@Query() queryDto: UsersQueryDto) {
    return this.usersService.getUsers(queryDto);
  }

  @Get('statistic')
  getStatistics() {
    return this.usersService.getStatistics();
  }

  @Patch('upgrade-subscription')
  @WriteThrottle()
  upgradeSubscription(@Req() request: { userId: string }) {
    return this.usersService.upgradeSubscription(request.userId);
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @WriteThrottle()
  update(
    @Param() { id }: IsValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: { userId: string },
  ) {
    return this.usersService.updateUserById(id, updateUserDto, request.userId);
  }

  @Delete(':id')
  @WriteThrottle()
  remove(@Param() { id }: IsValidObjectId, @Req() request: { userId: string }) {
    return this.usersService.deleteUserById(id, request.userId);
  }
}
