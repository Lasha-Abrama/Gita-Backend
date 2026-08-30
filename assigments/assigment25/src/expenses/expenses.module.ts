import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { expenseSchema } from './schema/expense.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'expense', schema: expenseSchema }]),
    UsersModule,
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
