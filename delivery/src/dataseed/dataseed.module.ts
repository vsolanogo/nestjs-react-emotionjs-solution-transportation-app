import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';
import { Shop } from '../shop/shop.entity';
import { Product } from '../product/product.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { DataSeedService } from './dataseed.service';
import { ShopService } from '../shop/shop.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
import { UserService } from '../user/user.service';
import { OrderItemService } from '../order-item/order-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Order, OrderItem, Product, Shop]),
  ],
  providers: [
    DataSeedService,
    ShopService,
    ProductService,
    OrderService,
    UserService,
    OrderItemService,
  ],
})
export class DataSeedModule {}
