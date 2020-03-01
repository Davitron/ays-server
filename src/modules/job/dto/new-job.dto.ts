import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, IsString, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { IsGreaterThan } from '../decorators/compensation.decorator';

export enum EmploymentTypes {
  FULLTIME = 'FULLTIME',
  CONTRACT = 'CONTRACT',
}

export class NewJobDto {

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly title: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly location: string;

  @IsEnum(EmploymentTypes)
  @ApiProperty({ enum: ['FULLTIME', 'CONTRACT']})
  public readonly type: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty()
  public readonly description: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly address: string;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  public readonly motivation: string;

  @IsString({ each: true })
  @ApiProperty()
  public readonly benefits: string[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  public readonly minCompensation: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('minCompensation', {
    message: 'maximum comensation must be greater than minimum compensation',
  })
  @ApiProperty()
  public readonly maxCompensation: string;
}
