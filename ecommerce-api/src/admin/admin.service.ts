import { BcryptService } from '../services/bcrypt.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly userRepository: Repository<Admin>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(user: Admin): Promise<string> {
    const hashedPassword = await this.bcryptService.hashPassword(user.password);
    const userToSave = {
      ...user,
      password: hashedPassword,
    };

    try {
      await this.userRepository.save(userToSave);
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
    return 'Usuario Administador criado com sucesso';
  }
  async findByEmail(email: string): Promise<Admin | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
