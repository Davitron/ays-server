import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly firstName?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly lastName?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly headline?: string;

  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  public readonly aboutMe?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty()
  public readonly skills?: string[];

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
}
