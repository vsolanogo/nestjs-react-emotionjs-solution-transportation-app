import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { 
  IsEmail, 
} from "class-validator"
import { Order } from '../order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Order, (i) => i.user)
  orders: Order[];

  @Column({ nullable: false, length: 255 })
  userName: string;

  @Column({ nullable: false, length: 255 })
  phone: string;

  @Column({ nullable: false, length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false, length: 255 })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
