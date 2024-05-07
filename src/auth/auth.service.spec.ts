import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserValidationService } from './user-validation.service';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';

const jwtServiceMock = {
  sign: jest.fn().mockReturnValue('mockedToken'),
};

const userValidationServiceMock = {
  validateUser: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: UserValidationService,
          useValue: userValidationServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica servico Authservice', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('deve retornar o token de acesso e o ID do Cliente se as credenciais forem válidas', async () => {
      const loginDto: LoginDto = {
        email: 'costumer@costumer.com',
        password: 'password',
      };
      const user = { id: uuidv4(), email: loginDto.email };

      userValidationServiceMock.validateUser.mockResolvedValue(user);

      const result = await service.login(loginDto, 'customer');

      expect(userValidationServiceMock.validateUser).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
        'customer',
      );
      expect(result).toEqual({ access_token: 'mockedToken', id: user.id });
    });

    it('deve retornar o token de acesso e o ID do Admin se as credenciais forem válidas', async () => {
      const loginDto: LoginDto = {
        email: 'admin@admin.com',
        password: 'password',
      };
      const user = { id: uuidv4(), email: loginDto.email };

      userValidationServiceMock.validateUser.mockResolvedValue(user);

      const result = await service.login(loginDto, 'admin');

      expect(userValidationServiceMock.validateUser).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
        'admin',
      );
      expect(result).toEqual({ access_token: 'mockedToken', id: user.id });
    });
  });

  describe('createdToken', () => {
    it('deve retornar um token JWT válido', () => {
      const user = { id: uuidv4(), email: 'customer@customer.com' };
      const token = service['createdToken'](user);

      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        { email: user.email, id: user.id },
        { secret: process.env.JWT_SECRET, expiresIn: '5h' },
      );
      expect(token).toEqual('mockedToken');
    });
  });
});
