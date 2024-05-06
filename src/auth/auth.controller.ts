import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth-service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Admin logado com sucesso e um token foi retornado',
  })
  async adminLogin(@Body() loginDto: LoginDto) {
    const type = 'admin';
    return this.authService.login(loginDto, type);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente logado com sucesso e um token foi retornado',
  })
  @Post('login')
  async userLogin(@Body() loginDto: LoginDto) {
    const type = 'customer';
    return this.authService.login(loginDto, type);
  }
}
