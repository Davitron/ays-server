import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkExperienceDto {
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  public readonly company: string;

  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  public readonly position: string;

  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  public readonly description: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly endDate: Date;
}
