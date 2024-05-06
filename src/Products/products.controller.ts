import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  @ApiResponse({
    status: 201,
    description: 'Produtos obtidos com sucesso',
  })
  async findAll() {
    return await this.productsService.getAll();
  }

  @Get(':city')
  @ApiParam({ name: 'city', description: 'Busca produtos por cidade' })
  async getCombosByCity(@Param('city') city: string): Promise<Product[]> {
    return this.productsService.getByCity(city);
  }

  @Post('create')
  @ApiOperation({
    summary: 'endpoint para cadastrar produtos',
    description:
      'no campo city e uma string como nome da cidade, podendo inserir mais de uma separando por (,)',
  })
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
      description: 'teste',
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
