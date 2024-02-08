// src/product-inventory/product-inventory.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInventory } from './product-inventory.entity';

@Injectable()
export class ProductInventoryService {
  private backup: ProductInventory[];

  constructor(
    @InjectRepository(ProductInventory)
    private productRepository: Repository<ProductInventory>,
  ) {}

  async getAllInventory(): Promise<ProductInventory[]> {
    return this.productRepository.find();
  }

  async addNewInventory(productData: {
    product_name: string;
    quantity: number;
    unit_price: number;
    note?: string;
  }): Promise<ProductInventory> {
    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);
    return savedProduct;
  }

  async updateInventory(productData: {
    product_id: number;
    product_name?: string;
    quantity?: number;
    unit_price?: number;
    note?: string;
  }): Promise<ProductInventory> {
    const { product_id } = productData;
    const product = await this.productRepository.findOne({
      where: [{ product_id }],
    });
    if (!product) {
      throw new Error('Product not found');
    }

    // 반복문을 사용해서 productData의 속성들을 product에 복사합니다.
    // product_id 속성은 제외하고 복사합니다.
    for (const key in productData) {
      if (productData.hasOwnProperty(key) && key !== 'product_id') {
        product[key] = productData[key];
      }
    }

    return this.productRepository.save(product);
  }

  async deleteInventory(product_id: number): Promise<boolean> {
    const product = await this.productRepository.findOne({
      where: [{ product_id }],
    });
    if (!product) {
      return false;
    }
    await this.productRepository.delete(product);
    return true;
  }

  async resetTable() {
    // Reset the table to its initial state
    await this.productRepository.delete({});
  }

  async backupTable() {
    this.backup = await this.productRepository.find();
  }

  async restoreTable() {
    // Delete all records
    await this.productRepository.delete({});

    // Insert the backup records
    this.backup.forEach(
      async (record) => await this.productRepository.save(record),
    );
  }
}
