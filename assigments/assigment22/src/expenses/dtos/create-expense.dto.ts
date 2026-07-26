import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { knownCategories } from '../constants/known-categories';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(knownCategories)
  category!: string;

  @IsNumber()
  @Min(1)
  price!: number;

  @IsNotEmpty()
  @IsString()
  productName!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
