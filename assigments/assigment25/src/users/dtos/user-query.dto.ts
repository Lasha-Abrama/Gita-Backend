import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class UsersQueryDto extends PaginationDto {
  @IsOptional()
  @IsIn(['m', 'f'])
  gender?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
