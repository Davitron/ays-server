import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsEnum } from 'class-validator';

export enum Roles {
  JOBSEEKER = 'JOBSEEKER',
  RECRUITER = 'RECRUITER',
  ADMIN     = 'ADMIN',
}

export class NewUserDto {

  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  public readonly firstName: string;

  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  public readonly lastName: string;

  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  public readonly password: string;

  @IsEnum(Roles)
  @ApiProperty({ enum: ['JOBSEEKER', 'RECRUITER', 'ADMIN']})
  public readonly role: string;
}
