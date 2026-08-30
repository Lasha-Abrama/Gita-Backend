import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';
import { IsAuthGuard } from '../guards/is-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userSchema }])],
  controllers: [UsersController],
  providers: [UsersService, IsAuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
