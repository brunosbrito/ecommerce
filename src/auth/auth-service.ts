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

    const token = await this.createdToken(user);

    if (user) {
      return { access_token: token };
    } else {
      return { message: 'Credenciais inválidas' };
    }
  }

  private createdToken(user): string {
    const payload = { email: user.email, id: user.id };
    const jwtConfig = {
      secret: process.env.JWT_SECRET,
      expiresIn: '5h',
    };
    const token = this.jwtService.sign(payload, jwtConfig);
    return token;
  }
}
