// test/product-inventory.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductInventoryModule } from '../src/product-inventory/product-inventory.module';
import { ProductInventoryService } from '../src/product-inventory/product-inventory.service';

describe('ProductInventory (e2e)', () => {
  let app;
  let productInventoryService: ProductInventoryService;
  let backup: object[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductInventoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    productInventoryService = moduleFixture.get<ProductInventoryService>(
      ProductInventoryService,
    );
    // Initialize the table
    backup = (await productInventoryService.getAllInventory()).map(
      (item) => JSON.parse(JSON.stringify(item)), // 인스턴스를 일반 객체로 복제합니다.
    );
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductInventoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let productId; // product_id를 저장할 변수를 추가합니다.

  const newProduct = {
    product_name: 'Test Product',
    quantity: 200,
    unit_price: 28000,
    note: 'Test Note',
  };

  const updatedProduct = {
    product_name: 'Updated Product',
    quantity: 180,
    unit_price: 24000,
    note: 'Updated Note',
  };

  it('/inventory (POST)', () => {
    return request(app.getHttpServer())
      .post('/inventory')
      .send(newProduct)
      .expect(201)
      .then((response) => {
        // 응답을 캡처해서 product_id를 저장합니다.
        productId = response.body.data.product_id;
        expect(response.body).toEqual({
          success: true,
          message: 'New item added to inventory successfully.',
          data: {
            product_id: productId,
            ...newProduct,
          },
        });
      });
  });

  it('/inventory (GET)', () => {
    return request(app.getHttpServer())
      .get('/inventory')
      .expect(200)
      .expect({
        success: true,
        data: [
          ...backup,
          {
            product_id: productId,
            ...newProduct,
          },
        ],
      });
  });

  it('/inventory/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/inventory/${productId}`) // 저장된 product_id를 사용합니다.
      .send(updatedProduct)
      .expect(200)
      .expect({
        success: true,
        message: `Item with product_id ${productId} has been updated successfully.`,
        data: {
          product_id: productId,
          ...updatedProduct,
        },
      });
  });

  it('/inventory (GET)', () => {
    return request(app.getHttpServer())
      .get('/inventory')
      .expect(200)
      .expect({
        success: true,
        data: [
          ...backup,
          {
            product_id: productId,
            ...updatedProduct,
          },
        ],
      });
  });

  it('/inventory/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/inventory/${productId}`) // 저장된 product_id를 사용합니다.
      .expect(200)
      .expect({
        success: true,
        message: `Item with product_id ${productId} has been deleted successfully.`,
      });
  });

  it('/inventory (GET)', () => {
    return request(app.getHttpServer()).get('/inventory').expect(200).expect({
      success: true,
      data: backup,
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
