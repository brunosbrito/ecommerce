import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserValidationService } from './user-validation.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userValidationService: UserValidationService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userValidationService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (user) {
      const payload = { email: user.email, sub: user.id };
      const jwtConfig = {
        secret: process.env.JWT_SECRET,
      };

      return {
        access_token: this.jwtService.sign(payload, jwtConfig),
      };
    }

    return { message: 'Invalid credentials' };
  }
}
