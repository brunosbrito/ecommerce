import { Controller, Post, Body } from '@nestjs/common';
import { Costumer } from './costumer.entity';
import { CostumerService } from './costumer.service';

@Controller('cadastro')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  async createCostumer(@Body() costumer: Costumer): Promise<Costumer> {
    return await this.costumerService.create(costumer);
  }
}
