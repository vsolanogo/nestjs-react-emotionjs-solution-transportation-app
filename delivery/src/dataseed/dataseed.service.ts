import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Shop } from '../shop/shop.entity';
import { faker } from '@faker-js/faker';
import { randFood } from '@ngneat/falso';
import { ShopService } from '../shop/shop.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
import { UserService } from '../user/user.service';

@Injectable()
export class DataSeedService {
  constructor(
    private readonly shopService: ShopService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  async seedDatabase(): Promise<any> {
    const shopsList: Array<Shop> = [];

    for (let i = 0; i < 4; i++) {
      const res = await this.shopService.create({
        shopName: faker.company.name(),
      });

      shopsList.push(res);
    }

    const productsList: Array<Array<Product>> = [];

    for (let i = 0; i < shopsList.length; i++) {
      const shopsProduct: Array<Product> = [];

      for (let j = 0; j < faker.number.int({ min: 5, max: 20 }); j++) {
        const res = await this.productService.create({
          productName: randFood(),
          price: faker.number.int({ min: 99, max: 2000 }),
          calories: faker.number.int({ min: 250, max: 1000 }),
          image: faker.image.urlLoremFlickr({ category: 'food' }),
          shop: shopsList[i].id,
        });
        shopsProduct.push(res);
      }

      productsList.push(shopsProduct);
    }

    const usersList: Array<User> = [];

    for (let i = 0; i < 3; i++) {
      const res = await this.userService.create({
        userName: faker.internet.displayName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
      });

      usersList.push(res);
    }

    for (let i = 0; i < shopsList.length; i++) {
      for (let j = 0; j < usersList.length; j++) {
        const randomProducts = productsList[i].slice(
          0,
          faker.number.int({ min: 1, max: 14 }),
        );

        const randomOrderItems = randomProducts.map((i) => ({
          productId: i.id,
          quantity: faker.number.int({ min: 1, max: 10 }),
        }));

        const res = await this.orderService.create({
          userId: usersList[j].id,
          orderItems: randomOrderItems,
        });
      }
    }
  }
}
