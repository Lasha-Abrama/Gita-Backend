import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { ExpensesQueryDto } from './dtos/expense-query.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getExpenses(@Query() queryDto: ExpensesQueryDto) {
    return this.expensesService.getExpenses(queryDto);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.getExpenseById(id);
  }

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.deleteExpenseById(id);
  }

  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseById(id, updateExpenseDto);
  }
}
