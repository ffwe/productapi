// src/product-inventory/product-inventory.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product_inventory')
export class ProductInventory {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @Column({ nullable: true })
  note: string;
}
