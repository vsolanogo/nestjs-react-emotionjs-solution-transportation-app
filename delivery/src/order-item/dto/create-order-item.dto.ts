import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
