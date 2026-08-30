import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { expenseSchema } from './schema/expense.schema';
import { UsersModule } from '../users/users.module';
import { IsAuthGuard } from '../guards/is-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'expense', schema: expenseSchema }]),
    UsersModule,
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService, IsAuthGuard],
})
export class ExpensesModule {}
