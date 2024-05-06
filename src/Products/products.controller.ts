import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthMiddleware } from 'src/auth/auth-middleware';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Produtos obtidos com sucesso',
  })
  async findAll() {
    return await this.productsService.getAll();
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        city: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
      },
      required: ['name', 'city', 'description', 'price'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Produto cadastrado com sucesso',
  })
  async createProduct(@Body() product: Product) {
    return await this.productsService.create(product);
  }
}
