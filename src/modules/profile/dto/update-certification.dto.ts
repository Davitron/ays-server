import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCertificationDto {
  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  public readonly organization?: string;

  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  public readonly title?: string;

  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  public readonly description?: string;

  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  public readonly linkToDoc?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly issueDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly expiryDate?: Date;
}
