import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Custumer } from './custumer.entity';
import { BcryptModule } from 'src/services/bcrypt.module';
import { CostumerController } from './custumer.controller';
import { CustumerService } from './costumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Custumer]), BcryptModule],
  controllers: [CostumerController],
  providers: [CustumerService],
  exports: [CustumerService],
})
export class CustumerModule {}
