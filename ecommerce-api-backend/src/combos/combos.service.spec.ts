import { Test, TestingModule } from '@nestjs/testing';
import { CombosService } from './combos.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Combo } from './combo.entity';
import { Product } from '../products/product.entity';
import { ServiceRegistry } from '../service-registry/service-registry.entity';

describe('CombosService', () => {
  let service: CombosService;
  let comboRepository: Repository<Combo>;
  let productRepository: Repository<Product>;
  let serviceRegistryRepository: Repository<ServiceRegistry>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombosService,
        {
          provide: getRepositoryToken(Combo),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ServiceRegistry),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CombosService>(CombosService);
    comboRepository = module.get<Repository<Combo>>(getRepositoryToken(Combo));
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    serviceRegistryRepository = module.get<Repository<ServiceRegistry>>(
      getRepositoryToken(ServiceRegistry),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getByCity', () => {
    it('Deve retornar combos com a cidade Betim', async () => {
      const city = 'betim';
      const mockCombos: Combo[] = [
        {
          id: 1,
          name: 'Combo 1',
          city: 'betim',
          products: [],
          serviceRegistries: [],
          price: 100,
        },
        {
          id: 2,
          name: 'Combo 2',
          city: 'betim',
          products: [],
          serviceRegistries: [],
          price: 0,
        },
      ];
      comboRepository.find = jest.fn().mockResolvedValue(mockCombos);
      const result = await service.getByCity(city);
      expect(result).toEqual(mockCombos);
    });

    it('Deve retornar um array vazio', async () => {
      const result = await service.getByCity('');
      expect(result).toEqual([]);
    });
  });
});
