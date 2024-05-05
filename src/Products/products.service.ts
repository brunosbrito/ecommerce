import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<string> {
    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.city
    ) {
      throw new BadRequestException(
        'Todos os campos obrigatórios devem ser fornecidos',
      );
    }

    await this.productRepository.save(product);

    return 'Produto criado com sucesso';
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}
