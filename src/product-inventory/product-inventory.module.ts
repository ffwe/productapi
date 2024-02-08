// src/product-inventory/product-inventory.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInventory } from './product-inventory.entity';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryController } from './product-inventory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInventory])],
  providers: [ProductInventoryService],
  controllers: [ProductInventoryController],
})
export class ProductInventoryModule {}
