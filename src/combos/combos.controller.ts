import { AuthMiddleware } from 'src/auth/auth-middleware';
import { CombosService } from './combos.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Combo } from './combo.entity';

@Controller('combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {}
  @Get()
  async findAll() {
    return await this.combosService.getAll();
  }

  @Post()
  @UseGuards(AuthMiddleware)
  async createProduct(@Body() comboData: { combo: Combo; city: number }) {
    const { combo, city } = comboData;
    return await this.combosService.create(combo, city);
  }
}
