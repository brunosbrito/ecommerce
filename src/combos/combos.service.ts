import { Injectable } from '@nestjs/common';
import { Combo } from './combo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { ServiceRegistry } from 'src/service-registry/service-registry.entity';

@Injectable()
export class CombosService {
  constructor(
    @InjectRepository(Combo)
    private readonly comboRepository: Repository<Combo>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ServiceRegistry)
    private readonly serviceRegistryRepository: Repository<ServiceRegistry>,
  ) {}

  async create(comboData: Partial<Combo>): Promise<string> {
    await this.verifyCityProductAndService(comboData);
    comboData.city = comboData.city.toLocaleLowerCase();
    const combo = await this.comboRepository.save(comboData);
    await this.addProductsAndServiesInCombo(combo);
    return 'Combo criado com sucesso';
  }

  private async verifyCityProductAndService(
    comboData: Partial<Combo>,
  ): Promise<void> {
    const upperCaseCity = comboData.city.toLocaleLowerCase();
    for (const productId of comboData.products) {
      const product = await this.productRepository.findOne({
        where: productId,
      });

      if (!product) {
        throw new Error(`Produto com ID ${productId} não encontrado`);
      }
      const cityExist = product.city.includes(upperCaseCity);

      if (!cityExist) {
        throw new Error(
          `O produto com ID ${productId} não pertence à cidade ${comboData.city}`,
        );
      }
    }

    for (const serviceId of comboData.serviceRegistries) {
      const service = await this.serviceRegistryRepository.findOne({
        where: serviceId,
      });

      if (!service) {
        throw new Error(`Produto com ID ${serviceId} não encontrado`);
      }

      const cityExist = service.city.includes(upperCaseCity);
      if (!cityExist) {
        throw new Error(
          `O Servico com ID ${serviceId} não pertence à cidade ${comboData.city}`,
        );
      }
    }
  }

  private async addProductsAndServiesInCombo(combo: Combo) {
    if (combo.products && combo.products.length > 0) {
      for (const product of combo.products) {
        await this.comboRepository
          .createQueryBuilder()
          .relation(Combo, 'products')
          .of(combo.id)
          .add(product);
      }
    }

    if (combo.serviceRegistries && combo.serviceRegistries.length > 0) {
      for (const serviceRegistries of combo.serviceRegistries) {
        console.log(serviceRegistries)
        await this.comboRepository
          .createQueryBuilder()
          .relation(Combo, 'serviceRegistries')
          .of(combo.id)
          .add(serviceRegistries);
      }
    }
  }
  async getAll(): Promise<Combo[]> {
    return this.comboRepository.find();
  }

  async getByCity(city: string): Promise<Combo[]> {
    return this.comboRepository.find({
      where: { city: Like(`%${city}%`) },
      relations: ['products', 'serviceRegistries'],
    });
  }
}
