import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Product> {
    return this.productService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }
}
