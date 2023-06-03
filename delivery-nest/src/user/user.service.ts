import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Order } from '../order/order.entity';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getOrdersOfUser(user: User): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['orderItems', 'orderItems.product', 'user'],
      where: { user: { id: user.id } },
    });
    return orders;
  }

  async getByEmail(getUserDto: GetUserDto): Promise<User> {
    return this.userRepository.findOne({
      where: { email: getUserDto.email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      return existingUser; // Return the existing user instead of throwing an error
    }

    const user = new User();
    user.userName = createUserDto.userName;
    user.phone = createUserDto.phone;
    user.email = createUserDto.email;
    user.address = createUserDto.address;

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.userRepository.save(user).catch((e) => {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('User already exists.');
      }

      if (e.detail) {
        throw new BadRequestException(e.detail);
      }

      return e;
    });
  }
}
