import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SubscriptionGuard } from '../guards/has-email-and-active-sub.guard';
import { IsValidObjectId } from '../common/dtos/is-valid-object-id.dto';
import { IsAuthGuard } from '../guards/is-auth.guard';

@Controller('products')
@UseGuards(IsAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(SubscriptionGuard)
  @Get()
  findAll(@Req() req: { hasActiveSubscription: boolean }) {
    return this.productsService.findAll(req['hasActiveSubscription']);
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IsValidObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId) {
    return this.productsService.remove(id);
  }
}
