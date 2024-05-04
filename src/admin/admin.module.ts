import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { BcryptModule } from 'src/services/bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), BcryptModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
