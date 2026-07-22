import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IExpense } from './expense.interface';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses: IExpense[] = [];

  getExpenses(): IExpense[] {
    return this.expenses;
  }

  createExpense(createExpenseDto: CreateExpenseDto): IExpense {
    const lastId = Math.max(0, ...this.expenses.map((expense) => expense.id));

    const newExpense: IExpense = {
      ...createExpenseDto,
      id: lastId + 1,
      totalPrice: createExpenseDto.quantity * createExpenseDto.price,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }

  getExpenseById(expenseId: number): IExpense {
    const expense = this.expenses.find(
      (currentExpense) => currentExpense.id === expenseId,
    );

    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    return expense;
  }

  deleteExpenseById(expenseId: number): IExpense {
    const index = this.expenses.findIndex(
      (currentExpense) => currentExpense.id === expenseId,
    );

    if (index === -1) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const [deletedExpense] = this.expenses.splice(index, 1);
    return deletedExpense;
  }

  updateExpenseById(
    expenseId: number,
    updateExpenseDto: UpdateExpenseDto,
  ): IExpense {
    const index = this.expenses.findIndex(
      (currentExpense) => currentExpense.id === expenseId,
    );

    if (index === -1) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const updatedExpense: IExpense = {
      ...this.expenses[index],
      ...updateExpenseDto,
      id: this.expenses[index].id,
    };
    updatedExpense.totalPrice = updatedExpense.quantity * updatedExpense.price;

    this.expenses[index] = updatedExpense;
    return updatedExpense;
  }
}
