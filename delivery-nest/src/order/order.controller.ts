import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetByContactOrderDto } from './dto/order.dto';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/history')
  async getByContactInfo(
    @Body() body: GetByContactOrderDto,
  ): Promise<Order[]> | null {
    return this.orderService.getByContactInfo(body);
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.create(body);
  }
}
