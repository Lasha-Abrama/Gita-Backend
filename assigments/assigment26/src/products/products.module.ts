import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from '../users/users.module';
import { SubscriptionGuard } from '../guards/has-email-and-active-sub.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { IsAuthGuard } from '../guards/is-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'product', schema: productSchema }]),
    UsersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, SubscriptionGuard, IsAuthGuard],
})
export class ProductsModule {}
