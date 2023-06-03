import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { DataSeedModule } from './dataseed/dataseed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop/shop.entity';
import { Product } from './product/product.entity';
import { User } from './user/user.entity';
import { Order } from './order/order.entity';
import { OrderItem } from './order-item/order-item.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          database: config.get<string>('DB_NAME'),
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          entities: [Shop, Product, User, Order, OrderItem],
          synchronize: true,
        };
      },
    }),
    ShopModule,
    ProductModule,
    UserModule,
    OrderModule,
    OrderItemModule,
    DataSeedModule,
  ],
})
export class AppModule {}
