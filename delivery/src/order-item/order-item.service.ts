import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderItem } from './order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderItemService {

}
