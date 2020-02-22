import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RecruiterInfo } from '../entities/recruiter-info.entity';

export class RecruiterInfoRequestDto {
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  public readonly company: string;

  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  public readonly address: string;

  @IsOptional()
  @MaxLength(100)
  @ApiProperty()
  public readonly website?: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly position: string;

  @IsNotEmpty()
  @MaxLength(15)
  @ApiProperty()
  public readonly phoneNumber: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly referer: string;
}
