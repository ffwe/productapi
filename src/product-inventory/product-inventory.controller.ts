import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';

@Controller('inventory')
export class ProductInventoryController {
  constructor(private readonly productService: ProductInventoryService) {}

  @Get()
  async getAllInventory() {
    try {
      const inventory = await this.productService.getAllInventory();
      return {
        success: true,
        data: inventory,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Failed to retrieve inventory information.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async addNewInventory(
    @Body()
    productData: {
      product_name: string;
      quantity: number;
      unit_price: number;
      note?: string;
    },
  ): Promise<any> {
    try {
      const newProduct = await this.productService.addNewInventory(productData);
      return {
        success: true,
        message: 'New item added to inventory successfully.',
        data: newProduct,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to add new item to inventory.',
      };
    }
  }

  @Put(':product_id')
  async updateInventory(
    @Param('product_id') product_id: number,
    @Body()
    productData: {
      product_name?: string;
      quantity?: number;
      unit_price?: number;
      note?: string;
    },
  ): Promise<any> {
    try {
      const updatedProduct = await this.productService.updateInventory({
        product_id,
        ...productData,
      });
      return {
        success: true,
        message: `Item with product_id ${product_id} has been updated successfully.`,
        data: updatedProduct,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Failed to update the item.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':product_id')
  async deleteInventory(@Param('product_id') product_id: number) {
    const success = await this.productService.deleteInventory(product_id);
    if (success) {
      return {
        success: true,
        message: `Item with product_id ${product_id} has been deleted successfully.`,
      };
    } else {
      throw new HttpException(
        'Failed to delete the item.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
