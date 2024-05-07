import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { v4 as uuidv4 } from 'uuid';
import { BcryptService } from '../services/bcrypt.service';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let bcryptService: BcryptService;
  let userRepository: Repository<Admin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        BcryptService,
        {
          provide: getRepositoryToken(Admin),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    bcryptService = module.get<BcryptService>(BcryptService);
    userRepository = module.get<Repository<Admin>>(getRepositoryToken(Admin));
  });

  it('Verifica o servico adminService', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve criar um novo admin com hash na senha', async () => {
      const mockAdmin: Admin = {
        name: 'adminMock',
        email: 'adminMock@gamil.com',
        password: 'password123',
        id: '',
      };

      const mockHashPassword = jest.fn().mockResolvedValue('hashedPassword');
      jest
        .spyOn(bcryptService, 'hashPassword')
        .mockImplementation(mockHashPassword);

      const mockSave = jest.fn().mockResolvedValue(mockAdmin);
      jest.spyOn(userRepository, 'save').mockImplementation(mockSave);

      const result = await service.create(mockAdmin);

      expect(mockHashPassword).toHaveBeenCalledWith(mockAdmin.password);
      expect(mockSave).toHaveBeenCalledWith({
        ...mockAdmin,
        password: 'hashedPassword',
      });
      expect(result).toBe('Usuario Administador criado com sucesso');
    });
  });

  describe('findByEmail', () => {
    it('Deve buscar Admin pelo email', async () => {
      const mockEmail = 'adminMock@gamil.com';
      const mockAdmin: Admin = {
        id: uuidv4(),
        name: 'adminMock',
        email: 'adminMock@gamil.com',
        password: 'hashedPassword',
      };

      const mockFindOne = jest.fn().mockResolvedValue(mockAdmin);
      jest.spyOn(userRepository, 'findOne').mockImplementation(mockFindOne);

      const result = await service.findByEmail(mockEmail);

      expect(mockFindOne).toHaveBeenCalledWith({ where: { email: mockEmail } });
      expect(result).toBe(mockAdmin);
    });

    it('deve retornar undefined se o admin não for encontrado', async () => {
      const mockEmail = 'naosouadm@admin.com';

      const mockFindOne = jest.fn().mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findOne').mockImplementation(mockFindOne);

      const result = await service.findByEmail(mockEmail);

      expect(mockFindOne).toHaveBeenCalledWith({ where: { email: mockEmail } });
      expect(result).toBeUndefined();
    });
  });
});
