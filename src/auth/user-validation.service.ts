import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/admin.entity';
import { AdminService } from 'src/admin/admin.service';
import { CustumerService } from 'src/custumer/costumer.service';
import { Custumer } from 'src/custumer/custumer.entity';
import { BcryptService } from 'src/services/bcrypt.service';

@Injectable()
export class UserValidationService {
  constructor(
    private readonly adminService: AdminService,
    private readonly bcryptService: BcryptService,
    private readonly customerService: CustumerService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    type: string,
  ): Promise<Omit<Admin, 'password'> | null> {
    if (type === 'admin') {
      return this.validateAdmin(email, password);
    } else if (type === 'customer') {
      return this.validateCustomer(email, password);
    } else {
      return null;
    }
  }

  private async validateAdmin(
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

  private async validateCustomer(
    email: string,
    password: string,
  ): Promise<Omit<Custumer, 'password'> | null> {
    const customer = await this.customerService.findByEmail(email);
    if (
      customer &&
      (await this.bcryptService.verifyPassword(password, customer.password))
    ) {
      const { password, ...result } = customer;
      return result;
    }
    return null;
  }
}
