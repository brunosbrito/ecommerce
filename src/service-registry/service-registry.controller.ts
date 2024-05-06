import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ServiceRegistryService } from './service-registry.service';
import { ServiceRegistry } from './service-registry.entity';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('service-registry')
@Controller('service-registry')
export class ServiceRegistryController {
  constructor(private readonly serviceRegistry: ServiceRegistryService) {}

  @Get('all')
  async findAll() {
    return await this.serviceRegistry.getAll();
  }

  @Get(':city')
  @ApiParam({ name: 'city', description: 'Busca produtos por cidade' })
  async getCombosByCity(
    @Param('city') city: string,
  ): Promise<ServiceRegistry[]> {
    return this.serviceRegistry.getByCity(city);
  }

  @Post('create')
  @ApiBearerAuth()
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
    description: 'Serviços cadastrado com sucesso',
  })
  async createProduct(@Body() serviceRegistry: ServiceRegistry) {
    return await this.serviceRegistry.create(serviceRegistry);
  }
}
