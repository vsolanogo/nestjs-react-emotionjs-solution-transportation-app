import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './user.entity';
import { Order } from '../order/order.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/:id/orders')
  async getOrders(@Param('id') id: number): Promise<Order[]> {
    const user = await this.getById(id);
    return this.userService.getOrdersOfUser(user);
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Get('/email')
  async getByEmail(@Body() body: GetUserDto): Promise<User> {
    return this.userService.getByEmail(body);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }
}
