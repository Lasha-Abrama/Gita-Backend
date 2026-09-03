import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { knownCategories } from '../constants/known-categories';
import { PaginationDto } from './pagination.dto';

export class ExpensesQueryDto extends PaginationDto {
  @IsOptional()
  @IsIn(knownCategories)
  category?: string;

  @IsOptional()
  @IsNumberString()
  priceFrom?: string;

  @IsOptional()
  @IsNumberString()
  priceTo?: string;
}
