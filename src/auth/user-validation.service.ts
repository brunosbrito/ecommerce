import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/admin.entity';
import { AdminService } from 'src/admin/admin.service';
import { BcryptService } from 'src/services/bcrypt.service';

@Injectable()
export class UserValidationService {
  constructor(
    private readonly adminService: AdminService,
    private readonly bcryptService: BcryptService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<Admin, 'password'> | null> {
    const admin = await this.adminService.findByEmail(email);
    if (
      admin &&
      (await this.bcryptService.verifyPassword(password, admin.password))
    ) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }
}
