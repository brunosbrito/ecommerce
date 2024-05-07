import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRegistry } from './service-registry.entity';
import { ServiceRegistryController } from './service-registry.controller';
import { ServiceRegistryService } from './service-registry.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRegistry]), AuthModule],
  controllers: [ServiceRegistryController],
  providers: [ServiceRegistryService],
  exports: [ServiceRegistryService],
})
export class ServiceRegistryModule {}
