import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ServiceRegistryService } from './service-registry.service';
import { AuthMiddleware } from 'src/auth/auth-middleware';
import { ServiceRegistry } from './service-registry.entity';

@Controller('service-registry')
export class ServiceRegistryController {
  constructor(private readonly serviceRegistry: ServiceRegistryService) {}

  @Get()
  async findAll() {
    return await this.serviceRegistry.getAll();
  }

  @Post()
  @UseGuards(AuthMiddleware)
  async createProduct(@Body() serviceRegistry: ServiceRegistry) {
    return await this.serviceRegistry.create(serviceRegistry);
  }
}
