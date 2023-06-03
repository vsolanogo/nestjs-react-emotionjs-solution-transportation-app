import { Controller, Get, Param } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
}
