import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class NewEducationDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  public readonly institution: string;

  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  public readonly degree: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  public readonly course: string;

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
