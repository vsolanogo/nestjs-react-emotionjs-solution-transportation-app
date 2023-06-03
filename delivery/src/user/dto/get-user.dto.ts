import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
