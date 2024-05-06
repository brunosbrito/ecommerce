import { Controller, Post, Body } from '@nestjs/common';
import { Custumer } from './custumer.entity';
import { CustumerService } from './costumer.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('costumer')
@Controller('cadastro')
export class CostumerController {
  constructor(private readonly costumerService: CustumerService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
        age: { type: 'string' },
        adress: { type: 'string' },
        zipCode: { type: 'string' },
        state: { type: 'string' },
        city: { type: 'string' },
      },
      required: [
        'name',
        'email',
        'password',
        'age',
        'adress',
        'zipCode',
        'state',
        'city',
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso',
  })
  async createCostumer(@Body() costumer: Custumer): Promise<Custumer> {
    return await this.costumerService.create(costumer);
  }
}
