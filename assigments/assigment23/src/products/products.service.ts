import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const lastId =
      this.products.length > 0 ? this.products[this.products.length - 1].id : 0;

    const newProduct = {
      id: lastId + 1,
      ...createProductDto,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  findAll(hasActiveSubscription = false) {
    return this.products.map((product) => ({
      ...product,
      price: hasActiveSubscription
        ? Number((product.price * 0.9).toFixed(2))
        : product.price,
    }));
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);

    return product;
  }

  remove(id: number) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new NotFoundException('Product not found');
    }

    return this.products.splice(index, 1);
  }
}
