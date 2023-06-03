import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { Product } from '../product/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem, Product])],
    controllers: [OrderItemController],
    providers: [OrderItemService],
})
export class OrderItemModule {}
