import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsDate } from 'class-validator';

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
  @ApiProperty()
  public readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  public readonly endDate: Date;
}
