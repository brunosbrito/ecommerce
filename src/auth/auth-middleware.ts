import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth-service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const decodedToken = await this.authService.verifyToken(token);
      req.body = decodedToken;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
