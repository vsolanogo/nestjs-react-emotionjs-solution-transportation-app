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

  @Column({ type: 'decimal', precision: 10, scale: 8 }) 
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 }) 
  longitude: number;

  // @OneToMany(() => Product, (i) => i.shop)
  // product: Product[];
}
