import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserValidationService } from './user-validation.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BcryptModule } from 'src/services/bcrypt.module';
import { AdminModule } from 'src/admin/admin.module';
import { CustumerModule } from 'src/custumer/custumer.module';

@Module({
  imports: [BcryptModule, AdminModule, CustumerModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserValidationService, JwtService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
