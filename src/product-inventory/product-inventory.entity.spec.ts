// product-inventory/product-inventory.entity.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductInventory } from './product-inventory.entity';
import typeOrmConfig from '../database.config.testing';

describe('ProductInventory Entity', () => {
  let module: TestingModule;
  let productInventoryRepository: Repository<ProductInventory>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([ProductInventory]),
      ],
    }).compile();

    productInventoryRepository = module.get<Repository<ProductInventory>>(
      getRepositoryToken(ProductInventory),
    );
  });

  beforeEach(async () => {
    // 테스트 데이터베이스 초기화
    await productInventoryRepository.clear();
  });

  afterAll(async () => {
    // 테스트 종료 시 TypeORM 연결 해제
    await module.close();
  });

  it('should be defined', async () => {
    expect(productInventoryRepository).toBeDefined();
  });

  it('should create a product inventory', async () => {
    const newProduct: ProductInventory = {
      product_name: 'TestProduct',
      quantity: 10,
      unit_price: 1999,
      note: 'Test Note',
      product_id: 0,
    };

    const createdProduct = await productInventoryRepository.save(newProduct);

    const foundProduct = await productInventoryRepository.findOne({
      where: { product_id: createdProduct.product_id },
    });

    expect(foundProduct).toEqual({
      ...newProduct,
      product_id: createdProduct.product_id,
    });
  });

  // 더 많은 테스트 추가
});
