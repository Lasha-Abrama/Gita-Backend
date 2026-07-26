import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpensesQueryDto } from './dtos/expense-query.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'Food',
      productName: 'Pizza',
      quantity: 2,
      price: 18,
      totalPrice: 36,
    },
    {
      id: 2,
      category: 'Sport',
      productName: 'Football',
      quantity: 1,
      price: 45,
      totalPrice: 45,
    },
    {
      id: 3,
      category: 'Technic',
      productName: 'Keyboard',
      quantity: 1,
      price: 95,
      totalPrice: 95,
    },
    {
      id: 4,
      category: 'Travel',
      productName: 'Train Ticket',
      quantity: 2,
      price: 28,
      totalPrice: 56,
    },
    {
      id: 5,
      category: 'Shopping',
      productName: 'T-Shirt',
      quantity: 3,
      price: 20,
      totalPrice: 60,
    },
    {
      id: 6,
      category: 'Food',
      productName: 'Burger',
      quantity: 2,
      price: 12,
      totalPrice: 24,
    },
    {
      id: 7,
      category: 'Sport',
      productName: 'Basketball',
      quantity: 1,
      price: 35,
      totalPrice: 35,
    },
    {
      id: 8,
      category: 'Technic',
      productName: 'Mouse',
      quantity: 2,
      price: 25,
      totalPrice: 50,
    },
    {
      id: 9,
      category: 'Travel',
      productName: 'Flight Ticket',
      quantity: 1,
      price: 180,
      totalPrice: 180,
    },
    {
      id: 10,
      category: 'Shopping',
      productName: 'Sneakers',
      quantity: 1,
      price: 110,
      totalPrice: 110,
    },
    {
      id: 11,
      category: 'Food',
      productName: 'Pasta',
      quantity: 4,
      price: 8,
      totalPrice: 32,
    },
    {
      id: 12,
      category: 'Sport',
      productName: 'Gym Gloves',
      quantity: 2,
      price: 18,
      totalPrice: 36,
    },
    {
      id: 13,
      category: 'Technic',
      productName: 'Monitor',
      quantity: 1,
      price: 240,
      totalPrice: 240,
    },
    {
      id: 14,
      category: 'Travel',
      productName: 'Hotel Night',
      quantity: 2,
      price: 75,
      totalPrice: 150,
    },
    {
      id: 15,
      category: 'Shopping',
      productName: 'Jeans',
      quantity: 2,
      price: 42,
      totalPrice: 84,
    },
    {
      id: 16,
      category: 'Food',
      productName: 'Coffee',
      quantity: 6,
      price: 4,
      totalPrice: 24,
    },
    {
      id: 17,
      category: 'Sport',
      productName: 'Yoga Mat',
      quantity: 1,
      price: 30,
      totalPrice: 30,
    },
    {
      id: 18,
      category: 'Technic',
      productName: 'Headphones',
      quantity: 1,
      price: 150,
      totalPrice: 150,
    },
    {
      id: 19,
      category: 'Travel',
      productName: 'Taxi Ride',
      quantity: 5,
      price: 9,
      totalPrice: 45,
    },
    {
      id: 20,
      category: 'Shopping',
      productName: 'Backpack',
      quantity: 1,
      price: 65,
      totalPrice: 65,
    },
    {
      id: 21,
      category: 'Food',
      productName: 'Steak',
      quantity: 2,
      price: 22,
      totalPrice: 44,
    },
    {
      id: 22,
      category: 'Sport',
      productName: 'Running Shoes',
      quantity: 1,
      price: 130,
      totalPrice: 130,
    },
    {
      id: 23,
      category: 'Technic',
      productName: 'USB Drive',
      quantity: 3,
      price: 18,
      totalPrice: 54,
    },
    {
      id: 24,
      category: 'Travel',
      productName: 'Bus Ticket',
      quantity: 10,
      price: 2,
      totalPrice: 20,
    },
    {
      id: 25,
      category: 'Shopping',
      productName: 'Jacket',
      quantity: 1,
      price: 95,
      totalPrice: 95,
    },
    {
      id: 26,
      category: 'Food',
      productName: 'Ice Cream',
      quantity: 5,
      price: 3,
      totalPrice: 15,
    },
    {
      id: 27,
      category: 'Sport',
      productName: 'Protein Powder',
      quantity: 1,
      price: 55,
      totalPrice: 55,
    },
    {
      id: 28,
      category: 'Technic',
      productName: 'Laptop Stand',
      quantity: 2,
      price: 28,
      totalPrice: 56,
    },
    {
      id: 29,
      category: 'Travel',
      productName: 'Museum Ticket',
      quantity: 3,
      price: 14,
      totalPrice: 42,
    },
    {
      id: 30,
      category: 'Shopping',
      productName: 'Cap',
      quantity: 2,
      price: 15,
      totalPrice: 30,
    },
    {
      id: 31,
      category: 'Food',
      productName: 'Sandwich',
      quantity: 4,
      price: 7,
      totalPrice: 28,
    },
    {
      id: 32,
      category: 'Sport',
      productName: 'Skipping Rope',
      quantity: 2,
      price: 12,
      totalPrice: 24,
    },
    {
      id: 33,
      category: 'Technic',
      productName: 'SSD 1TB',
      quantity: 1,
      price: 120,
      totalPrice: 120,
    },
    {
      id: 34,
      category: 'Travel',
      productName: 'Car Rental',
      quantity: 2,
      price: 60,
      totalPrice: 120,
    },
    {
      id: 35,
      category: 'Shopping',
      productName: 'Watch',
      quantity: 1,
      price: 175,
      totalPrice: 175,
    },
    {
      id: 36,
      category: 'Food',
      productName: 'Sushi',
      quantity: 3,
      price: 16,
      totalPrice: 48,
    },
    {
      id: 37,
      category: 'Sport',
      productName: 'Tennis Racket',
      quantity: 1,
      price: 140,
      totalPrice: 140,
    },
    {
      id: 38,
      category: 'Technic',
      productName: 'Smartphone',
      quantity: 1,
      price: 850,
      totalPrice: 850,
    },
    {
      id: 39,
      category: 'Travel',
      productName: 'Ferry Ticket',
      quantity: 2,
      price: 32,
      totalPrice: 64,
    },
    {
      id: 40,
      category: 'Shopping',
      productName: 'Sunglasses',
      quantity: 2,
      price: 45,
      totalPrice: 90,
    },
    {
      id: 41,
      category: 'Food',
      productName: 'Salad',
      quantity: 3,
      price: 9,
      totalPrice: 27,
    },
    {
      id: 42,
      category: 'Sport',
      productName: 'Cycling Helmet',
      quantity: 1,
      price: 85,
      totalPrice: 85,
    },
    {
      id: 43,
      category: 'Technic',
      productName: 'Webcam',
      quantity: 2,
      price: 70,
      totalPrice: 140,
    },
    {
      id: 44,
      category: 'Travel',
      productName: 'Camping Fee',
      quantity: 4,
      price: 18,
      totalPrice: 72,
    },
    {
      id: 45,
      category: 'Shopping',
      productName: 'Perfume',
      quantity: 1,
      price: 90,
      totalPrice: 90,
    },
    {
      id: 46,
      category: 'Food',
      productName: 'Chocolate',
      quantity: 10,
      price: 2,
      totalPrice: 20,
    },
    {
      id: 47,
      category: 'Sport',
      productName: 'Dumbbells',
      quantity: 2,
      price: 50,
      totalPrice: 100,
    },
    {
      id: 48,
      category: 'Technic',
      productName: 'Tablet',
      quantity: 1,
      price: 420,
      totalPrice: 420,
    },
    {
      id: 49,
      category: 'Travel',
      productName: 'Resort Booking',
      quantity: 3,
      price: 140,
      totalPrice: 420,
    },
    {
      id: 50,
      category: 'Shopping',
      productName: 'Gaming Chair',
      quantity: 1,
      price: 250,
      totalPrice: 250,
    },
  ];

  getExpenses({ page, take, category, priceFrom, priceTo }: ExpensesQueryDto) {
    if (
      priceFrom !== undefined &&
      priceTo !== undefined &&
      Number(priceFrom) > Number(priceTo)
    ) {
      throw new BadRequestException('priceFrom cannot be greater than priceTo');
    }

    let data = [...this.expenses];

    if (category) {
      data = data.filter(
        (expense) => expense.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (priceFrom !== undefined) {
      data = data.filter((expense) => expense.price >= Number(priceFrom));
    }

    if (priceTo !== undefined) {
      data = data.filter((expense) => expense.price <= Number(priceTo));
    }

    const total = data.length;
    const start = (page - 1) * take;
    const stop = page * take;

    data = data.slice(start, stop);

    return {
      expenses: data,
      total,
      page,
      limit: take,
    };
  }

  getExpenseById(expenseId: number) {
    const expense = this.expenses.find(
      (currentExpense) => currentExpense?.id === expenseId,
    );

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  createExpense(createExpenseDto: CreateExpenseDto) {
    const lastId = Math.max(0, ...this.expenses.map((expense) => expense.id));

    const newExpense = {
      id: lastId + 1,
      ...createExpenseDto,
      totalPrice: createExpenseDto.quantity * createExpenseDto.price,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }

  deleteExpenseById(expenseId: number) {
    const index = this.expenses.findIndex(
      (currentExpense) => currentExpense.id === expenseId,
    );

    if (index === -1) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const [deletedExpense] = this.expenses.splice(index, 1);
    return deletedExpense;
  }

  updateExpenseById(expenseId: number, updateExpenseDto: UpdateExpenseDto) {
    const index = this.expenses.findIndex(
      (currentExpense) => currentExpense.id === expenseId,
    );

    if (index === -1) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const updatedExpense = {
      ...this.expenses[index],
      ...updateExpenseDto,
      id: this.expenses[index].id,
    };
    updatedExpense.totalPrice = updatedExpense.quantity * updatedExpense.price;

    this.expenses[index] = updatedExpense;
    return updatedExpense;
  }
}
