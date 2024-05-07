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
  @ApiOperation({
    summary: 'Obter Todos os Produtos',
    description: 'Endpoint para obter todos os produtos cadastrados.',
  })
  @ApiResponse({
    status: 201,
    description: 'Produtos obtidos com sucesso',
  })
  async findAll() {
    return await this.productsService.getAll();
  }

  @Get(':city')
  @ApiOperation({
    summary: 'Obter Todos os Produtos por cidade',
    description:
      'Endpoint para obter todos os produtos cadastrados por cidade.',
  })
  @ApiParam({ name: 'city', description: 'Busca produtos por cidade' })
  async getCombosByCity(@Param('city') city: string): Promise<Product[]> {
    return this.productsService.getByCity(city);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Cadastro de Produtos',
    description:
      'Endpoint para cadastrar novos produtos. No campo "city", insira uma string com o nome da cidade ou várias cidades separadas por vírgulas.',
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
