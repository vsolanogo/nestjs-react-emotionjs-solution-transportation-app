import { Module } from '@nestjs/common';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Shop } from '../shop/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Shop])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
