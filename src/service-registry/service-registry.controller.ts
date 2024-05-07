import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ServiceRegistryService } from './service-registry.service';
import { ServiceRegistry } from './service-registry.entity';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('service-registry')
@Controller('service-registry')
export class ServiceRegistryController {
  constructor(private readonly serviceRegistry: ServiceRegistryService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Obter todos os serviços',
    description: 'Endpoint para obter todos os serviços.',
  })
  async findAll() {
    return await this.serviceRegistry.getAll();
  }

  @Get(':city')
  @ApiOperation({
    summary: 'Obter todos os serviços por cidade',
    description: 'Endpoint para obter todos os serviços por cidade.',
  })
  @ApiParam({ name: 'city', description: 'Busca produtos por cidade' })
  async getCombosByCity(
    @Param('city') city: string,
  ): Promise<ServiceRegistry[]> {
    return this.serviceRegistry.getByCity(city);
  }

  @Post('create')
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
  @ApiOperation({
    summary: 'Cadastro de Serviços',
    description:
      'Endpoint para cadastrar novos serviços. No campo "city", insira uma string com o nome da cidade ou várias cidades separadas por vírgulas.',
  })
  @ApiResponse({
    status: 201,
    description: 'Serviços cadastrado com sucesso',
  })
  async createProduct(@Body() serviceRegistry: ServiceRegistry) {
    return await this.serviceRegistry.create(serviceRegistry);
  }
}
