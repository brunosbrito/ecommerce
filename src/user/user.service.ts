import { BcryptService } from '../services/bcrypt.service';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(user: User): Promise<User> {
    const hashedPassword = await this.bcryptService.hashPassword(user.password);
    const userToSave = {
      ...user,
      password: hashedPassword,
    };
    return await this.userRepository.save(userToSave);
  }

  async update(id: string, updatedUserData: Partial<User>): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    const updatedUser = Object.assign(userToUpdate, updatedUserData);
    return await this.userRepository.save(updatedUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
