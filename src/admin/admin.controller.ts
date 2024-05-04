import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Controller('usuarios')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() admin: Admin): Promise<Admin> {
    return await this.adminService.create(admin);
  }

  @Put(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() admin: Admin,
  ): Promise<Admin> {
    return await this.adminService.update(id, admin);
  }
}
