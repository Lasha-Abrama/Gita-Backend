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
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { ExpensesQueryDto } from './dtos/expense-query.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpensesService } from './expenses.service';
import { IsValidObjectId } from '../common/dtos/is-valid-object-id.dto';
import { IsAuthGuard } from '../guards/is-auth.guard';

@Controller('expenses')
@UseGuards(IsAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() request: { userId: string },
  ) {
    return this.expensesService.create(createExpenseDto, request.userId);
  }

  @Get()
  findAll(@Query() queryDto: ExpensesQueryDto) {
    return this.expensesService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IsValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Req() request: { userId: string },
  ) {
    return this.expensesService.update(id, updateExpenseDto, request.userId);
  }

  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId, @Req() request: { userId: string }) {
    return this.expensesService.remove(id, request.userId);
  }
}
