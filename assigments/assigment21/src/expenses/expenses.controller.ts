import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getExpenses() {
    return this.expensesService.getExpenses();
  }

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    if (
      !createExpenseDto.category ||
      !createExpenseDto.productName ||
      createExpenseDto.quantity === undefined ||
      createExpenseDto.price === undefined
    ) {
      throw new HttpException(
        'Category, product name, quantity and price are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.expensesService.createExpense(createExpenseDto);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.expensesService.getExpenseById(Number(id));
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.expensesService.deleteExpenseById(Number(id));
  }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseById(Number(id), updateExpenseDto);
  }
}
