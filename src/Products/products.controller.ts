import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthMiddleware } from 'src/auth/auth-middleware';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return await this.productsService.getAll();
  }

  @Post()
  @UseGuards(AuthMiddleware)
  async createProduct(@Body() product: Product) {
    return await this.productsService.create(product);
  }
}
