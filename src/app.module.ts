// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './database.config';
import { ProductInventory } from './product-inventory/product-inventory.entity';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([ProductInventory]),
    ProductInventoryModule,
  ],
  exports: [ProductInventoryModule],
})
export class AppModule {}
