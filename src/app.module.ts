import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CostumerModule } from './costumer/costumer.module';
import { ProductsModule } from './products/products.module';
import { CombosModule } from './combos/combos.module';
import { ServiceRegistryModule } from './service-registry/service-registry.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    JwtModule.register({}),
    AdminModule,
    AuthModule,
    CostumerModule,
    ProductsModule,
    CombosModule,
    ServiceRegistryModule,
  ],
})
export class AppModule {}
