import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  shopName: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
