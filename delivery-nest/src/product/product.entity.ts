import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { 
  Min, 
} from "class-validator"
import { Shop } from '../shop/shop.entity';
import { OrderItem } from '../order-item/order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Min(1)
  @Column()
  price: number;

  @Min(1)
  @Column()
  calories: number;

  @Column()
  image: string;

  @OneToMany(() => OrderItem, (i) => i.product)
  orderItems: OrderItem[];

  @ManyToOne(() => Shop, (i) => i.id, {nullable: false})
  shop: Shop;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
