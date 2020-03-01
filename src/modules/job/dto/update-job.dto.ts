import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsOptional, IsString, IsEnum, IsNumber, IsPositive, Min } from 'class-validator';
import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
import { EmploymentTypes } from './new-job.dto';
import { IsGreaterThan } from '../decorators/compensation.decorator';

export class UpdateJobDto {

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly title?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly location?: string;

  @IsEnum(EmploymentTypes)
  @ApiProperty({ enum: ['FULLTIME', 'CONTRACT']})
  public readonly type?: string;

  @IsOptional()
  @MaxLength(1000)
  @ApiProperty()
  public readonly description?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly address?: string;

  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  public readonly motivation?: string;

  @IsString({ each: true })
  @ApiProperty()
  public readonly benefits?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  public readonly minCompensation?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('minCompensation', {
    message: 'maximum compensation must be greater than minimum compensation',
  })
  @ApiProperty()
  public readonly maxCompensation?: string;
}