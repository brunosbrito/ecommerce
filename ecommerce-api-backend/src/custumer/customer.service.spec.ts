import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptService } from '../services/bcrypt.service';
import { Custumer } from './custumer.entity';
import { CustumerService } from './costumer.service';

describe('CustmerService', () => {
  let service: CustumerService;
  let repository: Repository<Custumer>;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustumerService,
        BcryptService,
        {
          provide: getRepositoryToken(Custumer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CustumerService>(CustumerService);
    repository = module.get<Repository<Custumer>>(getRepositoryToken(Custumer));
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const custumerData: Custumer = {
      id: '',
      email: 'cliente@cliente.com',
      password: 'password',
      name: 'teste',
      age: 21,
      address: 'asas',
      zipCode: '3231321',
      state: 'MG',
      city: 'betim',
    };

    it('Deve criar um cliente', async () => {
      const hashedPassword = 'hashedPassword';
      jest
        .spyOn(bcryptService, 'hashPassword')
        .mockResolvedValue(hashedPassword);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...custumerData,
        password: hashedPassword,
      } as Custumer);

      const result = await service.create(custumerData);

      expect(bcryptService.hashPassword).toHaveBeenCalledWith(
        custumerData.password,
      );
      expect(repository.save).toHaveBeenCalledWith({
        ...custumerData,
        password: hashedPassword,
      });
      expect(result).toEqual({ ...custumerData, password: hashedPassword });
    });

    it('deve lançar ConflictException se o email já existir', async () => {
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await expect(service.create(custumerData)).rejects.toThrowError(
        'Este email já está em uso. Por favor, use outro email.',
      );
    });

    it('Deve gerar outros erros', async () => {
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(custumerData)).rejects.toThrowError(
        'Erro ao criar cliente. Por favor, tente novamente mais tarde.',
      );
    });
  });

  describe('findByEmail', () => {
    it('deve encontrar um cliente por e-mail', async () => {
      const email = 'test@example.com';
      const custumer = { id: 1, email, password: 'hashedPassword' };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(custumer as unknown as Custumer);

      const result = await service.findByEmail(email);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(custumer);
    });

    it('deve retornar indefinido se o cliente com email não existir', async () => {
      const email = 'naoexiste@example.com';

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findByEmail(email);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toBeUndefined();
    });
  });
});
