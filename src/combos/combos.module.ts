import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combo } from './combo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CombosController } from './combos.controller';
import { CombosService } from './combos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Combo]), AuthModule],
  controllers: [CombosController],
  providers: [CombosService],
  exports: [CombosService],
})
export class CombosModule {}
