import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEducationDto {
  @IsOptional()
  @MaxLength(10)
  @ApiProperty()
  public readonly institution?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly degree?: string;

  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  public readonly course?: string;

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
