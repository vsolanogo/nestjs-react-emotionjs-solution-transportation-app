import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { Shop } from '../shop/shop.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { validate } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const shopOfProduct = await this.shopRepository
      .createQueryBuilder('shop')
      .where('shop.id = :id', { id: createProductDto.shop })
      .getOne();

    if (!shopOfProduct) {
      throw new BadRequestException(
        `Shop with ID ${createProductDto.shop} not found.`,
      );
    }

    const product = new Product();
    product.productName = createProductDto.productName;
    product.price = createProductDto.price;
    product.calories = createProductDto.calories;
    product.image = createProductDto.image;
    product.shop = shopOfProduct;

    const errors = await validate(product);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.productRepository.save(product);
  }
}
