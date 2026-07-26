import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { UserGender } from '../enums/user-gender.enum';

export class CreateUserDto {
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

  @IsInt()
  @Min(100000000)
  @Max(999999999)
  phoneNumber!: number;

  @IsEnum(UserGender)
  gender!: UserGender;
}
