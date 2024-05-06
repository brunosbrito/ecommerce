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

  async create(serviceRegistryData: Partial<ServiceRegistry>): Promise<string> {
    if (
      !serviceRegistryData.name ||
      !serviceRegistryData.price ||
      !serviceRegistryData.description ||
      !serviceRegistryData.city
    ) {
      throw new BadRequestException(
        'Todos os campos obrigatórios devem ser fornecidos',
      );
    }
    serviceRegistryData.city = serviceRegistryData.city.toLowerCase();
    const serviceRegistry =
      this.serviceRegistryRepository.create(serviceRegistryData);
    await this.serviceRegistryRepository.save(serviceRegistry);

    return 'Serviço criado com sucesso';
  }

  async getAll(): Promise<ServiceRegistry[]> {
    return await this.serviceRegistryRepository.find();
  }
}
