import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth-service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login')
  async userLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
