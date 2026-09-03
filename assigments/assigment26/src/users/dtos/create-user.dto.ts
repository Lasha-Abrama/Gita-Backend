import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { UserGender } from '../enums/user-gender.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^\d{9}$/)
  phoneNumber!: string;

  @IsEnum(UserGender)
  gender!: UserGender;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}
