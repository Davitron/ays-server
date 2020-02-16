import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  public readonly password: string;
}
