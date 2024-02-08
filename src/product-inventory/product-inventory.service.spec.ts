import { Test, TestingModule } from '@nestjs/testing';
import { ProductInventoryService } from './product-inventory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ProductInventory } from './product-inventory.entity';

// Mocking the repository
class MockProductInventoryRepository {
  private storage: ProductInventory[] = [];

  find(): Promise<ProductInventory[]> {
    return Promise.resolve([]);
  }

  create(productData): ProductInventory {
    return { ...productData, id: Date.now() };
  }

  save(product: ProductInventory): Promise<ProductInventory> {
    const existingProductIndex = this.storage.findIndex(
      (storedProduct) => storedProduct.product_id === product.product_id,
    );
    if (existingProductIndex > -1) {
      this.storage[existingProductIndex] = product;
    } else {
      this.storage.push(product);
    }
    return Promise.resolve(product);
  }

  findOne(
    options: FindOneOptions<ProductInventory>,
  ): Promise<ProductInventory> {
    const product_id = options.where[0].product_id;
    const product = this.storage.find(
      (product) => product.product_id === product_id,
    );
    return Promise.resolve(product);
  }

  delete(product: ProductInventory): Promise<void> {
    this.storage = this.storage.filter(
      (storedProduct) => storedProduct.product_id !== product.product_id,
    );
    return Promise.resolve();
  }
}

describe('ProductInventoryService', () => {
  let service: ProductInventoryService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let productRepository: Repository<ProductInventory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductInventoryService,
        {
          provide: getRepositoryToken(ProductInventory),
          useClass: MockProductInventoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProductInventoryService>(ProductInventoryService);
    productRepository = module.get(getRepositoryToken(ProductInventory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty array', async () => {
    const result = await service.getAllInventory();
    expect(result).toEqual([]);
  });

  it('should add new inventory', async () => {
    const productData = {
      product_name: 'Test Product',
      quantity: 10,
      unit_price: 100,
    };

    const result = await service.addNewInventory(productData);

    expect(result).toBeDefined();
    // 반복문을 사용하여 updateData의 모든 속성에 대해 검증을 수행합니다.
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        expect(result[key]).toEqual(productData[key]);
      }
    }
  });

  it('should update inventory', async () => {
    const productData = {
      product_id: 1,
      product_name: 'Test Product',
      quantity: 10,
      unit_price: 100,
      note: 'Test Note',
    };

    const createResult = await service.addNewInventory(productData);

    const updateData = {
      product_id: createResult.product_id,
      product_name: 'Updated Product',
      quantity: 20,
      unit_price: 200,
      note: 'Updated Note',
    };

    const result = await service.updateInventory(updateData);

    expect(result).toBeDefined();

    // 반복문을 사용하여 updateData의 모든 속성에 대해 검증을 수행합니다.
    for (const key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        expect(result[key]).toEqual(updateData[key]);
      }
    }
  });

  it('should delete inventory', async () => {
    const productData = {
      product_id: 1,
      product_name: 'Test Product',
      quantity: 10,
      unit_price: 100,
    };

    const createResult = await service.addNewInventory(productData);
    await service.deleteInventory(createResult.product_id);

    const result = await service.getAllInventory();

    expect(result).not.toContain(createResult);
  });
});
