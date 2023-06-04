import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class GetByContactOrderDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;
}
