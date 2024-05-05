import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRegistry } from './service-registry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceRegistryService {
  constructor(
    @InjectRepository(ServiceRegistry)
    private readonly serviceRegistryRepository: Repository<ServiceRegistry>,
  ) {}

  async create(serviceRegistry: ServiceRegistry): Promise<string> {
    if (
      !serviceRegistry.name ||
      !serviceRegistry.price ||
      !serviceRegistry.description ||
      !serviceRegistry.city
    ) {
      throw new BadRequestException(
        'Todos os campos obrigatórios devem ser fornecidos',
      );
    }

    await this.serviceRegistryRepository.save(serviceRegistry);

    return 'Serviço criado com sucesso';
  }

  async getAll(): Promise<ServiceRegistry[]> {
    return await this.serviceRegistryRepository.find();
  }
}
