import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class GetByContactOrderDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;
}
