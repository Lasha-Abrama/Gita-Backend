import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpensesQueryDto } from './dtos/expense-query.dto';
import { Expense } from './schema/expense.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('expense') private expenseModel: Model<Expense>,
    private usersService: UsersService,
  ) {}

  async findAll({
    page,
    take,
    category,
    priceFrom,
    priceTo,
  }: ExpensesQueryDto) {
    if (priceFrom && priceTo && Number(priceFrom) > Number(priceTo)) {
      throw new BadRequestException('priceFrom cannot be greater than priceTo');
    }

    let expenses = await this.expenseModel.find();

    if (category) {
      expenses = expenses.filter((expense) => expense.category === category);
    }

    if (priceFrom) {
      expenses = expenses.filter(
        (expense) => expense.price >= Number(priceFrom),
      );
    }

    if (priceTo) {
      expenses = expenses.filter((expense) => expense.price <= Number(priceTo));
    }

    const total = expenses.length;
    const start = (page - 1) * take;

    return {
      expenses: expenses.slice(start, start + take),
      total,
      page,
      limit: take,
    };
  }

  async findOne(id: string) {
    const expense = await this.expenseModel.findById(id);

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async create(createExpenseDto: CreateExpenseDto, ownerId: string) {
    await this.usersService.getUserById(ownerId);

    const expense = await this.expenseModel.create({
      ...createExpenseDto,
      owner: new mongoose.Types.ObjectId(ownerId),
      totalPrice: createExpenseDto.price * createExpenseDto.quantity,
    });

    await this.usersService.addExpenseToUser(ownerId, expense._id.toString());

    return expense;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
    currentUserId: string,
  ) {
    const oldExpense = await this.findOne(id);
    if (oldExpense.owner.toString() !== currentUserId) {
      throw new ForbiddenException('You can only update your own expenses');
    }

    const price = updateExpenseDto.price ?? oldExpense.price;
    const quantity = updateExpenseDto.quantity ?? oldExpense.quantity;

    const expense = await this.expenseModel.findByIdAndUpdate(
      id,
      {
        ...updateExpenseDto,
        owner: oldExpense.owner,
        totalPrice: price * quantity,
      },
      { new: true },
    );

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async remove(id: string, currentUserId: string) {
    const expense = await this.findOne(id);
    if (expense.owner.toString() !== currentUserId) {
      throw new ForbiddenException('You can only delete your own expenses');
    }

    await this.expenseModel.findByIdAndDelete(id);

    await this.usersService.removeExpenseFromUser(expense.owner.toString(), id);

    return expense;
  }
}
