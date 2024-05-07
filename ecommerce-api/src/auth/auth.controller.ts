import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @ApiOperation({
    summary: 'Login de Administrador',
    description: 'Endpoint para o login de administradores.',
  })
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

  @Post('login')
  @ApiOperation({
    summary: 'Login de Cliente',
    description: 'Endpoint para o login de clientes.',
  })
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
  async userLogin(@Body() loginDto: LoginDto) {
    const type = 'customer';
    return this.authService.login(loginDto, type);
  }
}
