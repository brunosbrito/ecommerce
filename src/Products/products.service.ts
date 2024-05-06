import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(productData: Partial<Product>): Promise<string> {
    if (
      !productData.name ||
      !productData.price ||
      !productData.description ||
      !productData.city
    ) {
      throw new BadRequestException(
        'Todos os campos obrigatórios devem ser fornecidos',
      );
    }

    productData.city = productData.city.toLowerCase();
    const product = this.productRepository.create(productData);
    this.productRepository.save(product);
    return 'Produto criado com sucesso';
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getByCity(city: string): Promise<Product[]> {
    if (city == '') {
      return [];
    }
    return this.productRepository.find({
      where: { city: Like(`%${city}%`) },
    });
  }
}
