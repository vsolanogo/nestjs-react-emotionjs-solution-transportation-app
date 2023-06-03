import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { Product } from '../product/product.entity';
import { validate } from 'class-validator';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  async getById(id: number): Promise<Shop> {
    const shop = await this.shopRepository.findOne({ where: { id } });

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    return shop;
  }

  async getByIdProducts(shop: Shop): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ['shop'],
      where: { shop },
    });

    return products;
  }

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const shop = new Shop();
    shop.shopName = createShopDto.shopName;
    return this.shopRepository.save(shop).catch((e) => {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Shop already exists.');
      }

      if (e.detail) {
        throw new BadRequestException(e.detail);
      }

      return e;
    });
  }
}
