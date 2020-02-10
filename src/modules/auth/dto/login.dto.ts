import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;
}