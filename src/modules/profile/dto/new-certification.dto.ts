import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class NewCertificationDto {

  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  public readonly organization: string;

  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  public readonly title: string;

  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  public readonly description: string;

  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  public readonly linkToDoc: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly issueDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  public readonly expiryDate: Date;
}
