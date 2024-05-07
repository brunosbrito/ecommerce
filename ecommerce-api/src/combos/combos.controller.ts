import { AuthMiddleware } from 'src/auth/auth-middleware';
import { CombosService } from './combos.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Combo } from './combo.entity';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@UseGuards(AuthMiddleware)
@ApiTags('combos')
@Controller('combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {}
  @Get('all')
  @ApiOperation({
    summary: 'Listar Todos os Combos',
    description: 'Endpoint para obter todos os combos disponíveis.',
  })
  @ApiResponse({
    status: 201,
    description: 'Combos obtidos com sucesso',
  })
  async findAll() {
    return await this.combosService.getAll();
  }

  @Get(':city')
  @ApiOperation({
    summary: 'Listar Todos os Combos Por cidade',
    description: 'Endpoint para obter todos os combos disponíveis por cidade.',
  })
  @ApiParam({ name: 'city', description: 'Busca combos por cidade' })
  async getCombosByCity(@Param('city') city: string): Promise<Combo[]> {
    return this.combosService.getByCity(city);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Criar Produto',
    description: 'Endpoint para criar um novo produto. podendo inserir um array de produtos e servicos',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        products: { type: 'array', items: { type: 'number' } },
        serviceRegistries: { type: 'array', items: { type: 'number' } },
        price: { type: 'number' },
        city: { type: 'string' },
      },
      required: ['name', 'products', 'serviceRegistries', 'price', 'city'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Combos cadastrado com sucesso',
  })
  async createProduct(@Body() comboData: Combo) {
    return await this.combosService.create(comboData);
  }
}
