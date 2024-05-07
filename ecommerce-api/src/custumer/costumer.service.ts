import { BcryptService } from '../services/bcrypt.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Custumer } from './custumer.entity';

@Injectable()
export class CustumerService {
  constructor(
    @InjectRepository(Custumer)
    private readonly custumerRepository: Repository<Custumer>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(custumer: Custumer): Promise<Custumer> {
    const hashedPassword = await this.bcryptService.hashPassword(
      custumer.password,
    );
    const custumerToSave = {
      ...custumer,
      password: hashedPassword,
    };
    try {
      return await this.custumerRepository.save(custumerToSave);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Este email já está em uso. Por favor, use outro email.',
        );
      } else {
        throw new Error(
          'Erro ao criar cliente. Por favor, tente novamente mais tarde.',
        );
      }
    }
  }

  async findByEmail(email: string): Promise<Custumer | undefined> {
    return await this.custumerRepository.findOne({ where: { email } });
  }
}
