import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costumer } from './costumer.entity';
import { BcryptModule } from 'src/services/bcrypt.module';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Costumer]), BcryptModule],
  controllers: [CostumerController],
  providers: [CostumerService],
  exports: [CostumerService],
})
export class CostumerModule {}
