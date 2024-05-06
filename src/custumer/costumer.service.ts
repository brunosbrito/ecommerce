import { BcryptService } from 'src/services/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Custumer } from './custumer.entity';

@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(Custumer)
    private readonly custumerRepository: Repository<Custumer>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(custumer: Custumer): Promise<Custumer> {
    const hashedPassword = await this.bcryptService.hashPassword(
      custumer.password,
    );
    const userToSave = {
      ...custumer,
      password: hashedPassword,
    };
    return await this.custumerRepository.save(userToSave);
  }

  async findByEmail(email: string): Promise<Custumer | undefined> {
    return await this.custumerRepository.findOne({ where: { email } });
  }
}
