// src/product-inventory/product-inventory.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventory } from './product-inventory.entity';
import typeOrmConfig from '../database.config.testing';

describe('ProductInventoryController', () => {
  let controller: ProductInventoryController;
  let productService: ProductInventoryService;
  const mockValues = [
    {
      product_id: 1,
      product_name: 'Product A',
      quantity: 100,
      unit_price: 15000,
      note: null,
    },
    {
      product_id: 2,
      product_name: 'Product B',
      quantity: 150,
      unit_price: 22000,
      note: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig), // Use testing config here
        TypeOrmModule.forFeature([ProductInventory]),
      ],
      controllers: [ProductInventoryController],
      providers: [
        ProductInventoryService,
        {
          provide: getRepositoryToken(ProductInventory),
          useClass: Repository, // or your custom mock repository
        },
      ],
    }).compile();

    controller = module.get<ProductInventoryController>(
      ProductInventoryController,
    );
    productService = module.get<ProductInventoryService>(
      ProductInventoryService,
    );

    // Mock the service method
    jest.spyOn(productService, 'getAllInventory').mockResolvedValue(mockValues);

    jest
      .spyOn(productService, 'addNewInventory')
      .mockImplementation(async (productData) => {
        return {
          product_id: Math.floor(Math.random() * 1000), // Mock product_id
          product_name: productData.product_name,
          quantity: productData.quantity,
          unit_price: productData.unit_price,
          note: null, // Mock note
        };
      });

    jest.spyOn(productService, 'deleteInventory').mockResolvedValue(true);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllInventory', () => {
    it('should return inventory data', async () => {
      const result = await controller.getAllInventory();

      expect(result).toEqual({
        success: true,
        data: mockValues,
      });
    });
  });

  describe('addNewInventory', () => {
    it('should add a new inventory item', async () => {
      const inventoryItem = {
        product_name: 'Product C',
        quantity: 200,
        unit_price: 28000,
      };

      const result = await controller.addNewInventory(inventoryItem);

      expect(result).toBeDefined();

      // 반복문을 사용하여 inventoryItem의 모든 속성에 대해 검증을 수행합니다.
      for (const key in inventoryItem) {
        if (inventoryItem.hasOwnProperty(key)) {
          expect(result.data[key]).toEqual(inventoryItem[key]);
        }
      }
    });

    it('should return an error if inventory item is invalid', async () => {
      const inventoryItem = {
        product_id: 2,
        product_name: '', // Invalid product name
        quantity: 200,
        unit_price: 28000,
      };

      try {
        await controller.addNewInventory(inventoryItem);
      } catch (error) {
        expect(error.message).toBe('Invalid inventory item');
      }
    });
  });

  describe('updateInventory', () => {
    it('should update an inventory item', async () => {
      const product_id = 1;
      const updatedData = {
        quantity: 180,
        unit_price: 24000,
      };

      jest
        .spyOn(productService, 'updateInventory')
        .mockImplementation(async (productData) => {
          return {
            product_id: productData.product_id,
            product_name: 'Product A', // Mock product_name
            quantity: productData.quantity,
            unit_price: productData.unit_price,
            note: null, // Mock note
          };
        });

      const result = await controller.updateInventory(product_id, updatedData);

      expect(result).toBeDefined();
      expect(result.data.product_id).toEqual(product_id);

      // 반복문을 사용하여 updatedData의 모든 속성에 대해 검증을 수행합니다.
      for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key)) {
          expect(result.data[key]).toEqual(updatedData[key]);
        }
      }
    });
  });

  describe('deleteInventory', () => {
    it('should delete inventory', async () => {
      const product_id = 1;
      const result = await controller.deleteInventory(product_id);
      expect(result.success).toBe(true);
    });
  });
});
