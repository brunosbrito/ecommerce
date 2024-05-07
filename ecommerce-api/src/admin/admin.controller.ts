import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastro de Usuário Administrador',
    description: 'Endpoint para registrar novos usuários administradores.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
      },
      required: ['name', 'email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Admin criado com sucesso',
  })
  async createAdmin(@Body() admin: Admin): Promise<string> {
    return await this.adminService.create(admin);
  }
}
