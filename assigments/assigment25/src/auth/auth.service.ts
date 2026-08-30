import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, 'password');

    return userObject;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService
      .getUserByEmail(email)
      .select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        userId: user._id.toString(),
      }),
    };
  }
}
