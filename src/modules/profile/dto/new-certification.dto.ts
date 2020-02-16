import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsDate } from 'class-validator';

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
  @ApiProperty()
  public readonly issueDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  public readonly expiryDate: Date;
}
