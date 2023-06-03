import {
  Controller,
  Get,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './shop.entity';
import { Product } from '../product/product.entity';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async getAll(): Promise<Shop[]> {
    return this.shopService.getAll();
  }

  @Get('/:id/products')
  async getByIdProducts(@Param('id') id: number): Promise<Product[]> {
    const shop = await this.getById(id);
    return this.shopService.getByIdProducts(shop);
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Shop> {
    return this.shopService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateShopDto): Promise<Shop> {
    return this.shopService.create(body);
  }
}
