import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfileDto {

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly firstName: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly lastName: string;

  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  public readonly aboutMe?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly headline?: string;

  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  public readonly profilePic?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly country?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly state?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly phoneNumber?: string;

  @IsOptional()
  @ApiProperty()
  public readonly userId?: number;
}
