import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from '../users/users.module';
import { SubscriptionGuard } from '../guards/has-email-and-active-sub.guard';

@Module({
  imports: [UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService, SubscriptionGuard],
})
export class ProductsModule {}
