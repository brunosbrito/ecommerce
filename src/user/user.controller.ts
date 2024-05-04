import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Controller('usuarios')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }
}
