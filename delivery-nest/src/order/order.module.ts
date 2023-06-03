import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order, User, Order, OrderItem, Product])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
