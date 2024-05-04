import { BcryptService } from 'src/services/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Costumer } from './costumer.entity';

@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(Costumer)
    private readonly costumerRepository: Repository<Costumer>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(costumer: Costumer): Promise<Costumer> {
    const hashedPassword = await this.bcryptService.hashPassword(
      costumer.password,
    );
    const userToSave = {
      ...costumer,
      password: hashedPassword,
    };
    return await this.costumerRepository.save(userToSave);
  }

  async findByEmail(email: string): Promise<Costumer | undefined> {
    return await this.costumerRepository.findOne({ where: { email } });
  }
}
