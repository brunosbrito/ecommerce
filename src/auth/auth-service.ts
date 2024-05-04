// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  async adminLogin(loginDto: LoginDto) {
    return this.adminAuthService.login(loginDto);
  }
}
