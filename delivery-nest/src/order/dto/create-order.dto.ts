import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique((i: CreateOrderItemDto) => i.productId)
  @ValidateNested({ each: true })
  orderItems: CreateOrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
