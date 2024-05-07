import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRegistryService } from './service-registry.service';
import { ServiceRegistry } from './service-registry.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ServiceRegistryService', () => {
  let service: ServiceRegistryService;
  let repository: Repository<ServiceRegistry>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceRegistryService,
        {
          provide: getRepositoryToken(ServiceRegistry),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ServiceRegistryService>(ServiceRegistryService);
    repository = module.get<Repository<ServiceRegistry>>(
      getRepositoryToken(ServiceRegistry),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve criar servico com sucesso', async () => {
      const servicoData: Partial<ServiceRegistry> = {
        name: 'servico 1',
        price: 10,
        description: 'Test description',
        city: 'City',
      };

      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({} as ServiceRegistry);
      const createSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce({} as ServiceRegistry);

      await expect(service.create(servicoData)).resolves.toEqual(
        'Serviço criado com sucesso',
      );
      expect(createSpy).toHaveBeenCalledWith(servicoData);
      expect(saveSpy).toHaveBeenCalled();
    });

    it('Deve lançar BadRequestException se os campos obrigatórios estiverem faltando', async () => {
      const servicoData: Partial<ServiceRegistry> = {};

      await expect(service.create(servicoData)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('getAll', () => {
    it('Deve retornar todos os servicos', async () => {
      const servicos: ServiceRegistry[] = [
        {
          id: 1,
          name: 'servico 1',
          price: 10,
          description: 'servico 1',
          city: 'betim',
          combos: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(servicos);

      await expect(service.getAll()).resolves.toEqual(servicos);
    });
  });

  describe('getByCity', () => {
    it('Deve retornar todos os servicos por cidade', async () => {
      const city = 'Betim';
      const servicos: ServiceRegistry[] = [
        {
          id: 1,
          name: 'Servico 1',
          price: 10,
          description: 'Description 1',
          city,
          combos: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(servicos);

      await expect(service.getByCity(city)).resolves.toEqual(servicos);
    });

    it('Deve retornar um array vazio caso nao tenha cidade', async () => {
      const city = '';
      const servicos: ServiceRegistry[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(servicos);

      await expect(service.getByCity(city)).resolves.toEqual(servicos);
    });
  });
});
