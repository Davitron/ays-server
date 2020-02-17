import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateWorkExperienceDto {
  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  public readonly company?: string;

  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  public readonly position?: string;

  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  public readonly description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly endDate?: Date;
}
