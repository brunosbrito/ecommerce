import { Injectable } from '@nestjs/common';
import { Combo } from './combo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CombosService {
  constructor(
    @InjectRepository(Combo)
    private readonly comboRepository: Repository<Combo>,
  ) {}

  async create(comboData: Partial<Combo>, city: number): Promise<string> {
    const productsFromCity = comboData.products.every((product) =>
      product.city.includes(city),
    );
    const servicesFromCity = comboData.serviceRegistries.every((service) =>
      service.city.includes(city),
    );
    if (!productsFromCity || !servicesFromCity) {
      throw new Error('Produtos e Servicoes precisam ser da mesma cidade');
    }

    await this.comboRepository.save(comboData);
    return 'Combo criado com sucesso';
  }

  async getAll(): Promise<Combo[]> {
    return this.comboRepository.find();
  }
}
