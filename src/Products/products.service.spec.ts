import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve criar produto com sucesso', async () => {
      const productData: Partial<Product> = {
        name: 'Product 1',
        price: 10,
        description: 'Test description',
        city: 'City',
      };

      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({} as Product);
      const createSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce({} as Product);

      await expect(service.create(productData)).resolves.toEqual(
        'Produto criado com sucesso',
      );
      expect(createSpy).toHaveBeenCalledWith(productData);
      expect(saveSpy).toHaveBeenCalled();
    });

    it('Deve lançar BadRequestException se os campos obrigatórios estiverem faltando', async () => {
      const productData: Partial<Product> = {};

      await expect(service.create(productData)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('getAll', () => {
    it('Deve retornar todos os produtos', async () => {
      const products: Product[] = [
        {
          id: 1,
          name: 'produto 1',
          price: 10,
          description: 'descricao 1',
          city: 'betim',
          combos: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(products);

      await expect(service.getAll()).resolves.toEqual(products);
    });
  });

  describe('getByCity', () => {
    it('Deve retornar todos os produtos por cidade', async () => {
      const city = 'Betim';
      const products: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          price: 10,
          description: 'Description 1',
          city,
          combos: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(products);

      await expect(service.getByCity(city)).resolves.toEqual(products);
    });

    it('Deve retornar um array vazio caso nao tenha cidade', async () => {
      const city = '';
      const products: Product[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(products);

      await expect(service.getByCity(city)).resolves.toEqual(products);
    });
  });
});
