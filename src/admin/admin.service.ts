import { BcryptService } from 'src/services/bcrypt.service';
import { Injectable } from '@nestjs/common';
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

  async create(user: Admin): Promise<Admin> {
    const hashedPassword = await this.bcryptService.hashPassword(user.password);
    const userToSave = {
      ...user,
      password: hashedPassword,
    };
    return await this.userRepository.save(userToSave);
  }

  async update(id: string, updatedUserData: Partial<Admin>): Promise<Admin> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    const updatedUser = Object.assign(userToUpdate, updatedUserData);
    return await this.userRepository.save(updatedUser);
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
