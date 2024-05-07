import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combo } from './combo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CombosController } from './combos.controller';
import { CombosService } from './combos.service';
import { Product } from 'src/products/product.entity';
import { ServiceRegistry } from 'src/service-registry/service-registry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Combo, Product, ServiceRegistry]),
    AuthModule,
  ],
  controllers: [CombosController],
  providers: [CombosService],
  exports: [CombosService],
})
export class CombosModule {}
