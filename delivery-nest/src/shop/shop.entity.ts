import {
  Entity,
  PrimaryGeneratedColumn,
  Column, 
} from 'typeorm'; 

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255, unique: true })
  shopName: string;

  // @OneToMany(() => Product, (i) => i.shop)
  // product: Product[];
}
