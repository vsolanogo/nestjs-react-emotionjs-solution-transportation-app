import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Product])],
  controllers: [ShopController],
  providers: [ShopService],
  
})
export class ShopModule {}
