import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth-service';
import { AdminAuthService } from './admin-auth.service';
import { UserValidationService } from './user-validation.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptModule } from 'src/services/bcrypt.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [BcryptModule, AdminModule],
  controllers: [AuthController],
  providers: [AuthService, AdminAuthService, UserValidationService, JwtService],
})
export class AuthModule {}
