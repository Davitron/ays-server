import { ApiProperty } from '@nestjs/swagger';

export class UpdateCertificationDto {
  @ApiProperty()
  public readonly organization?: string;

  @ApiProperty()
  public readonly title?: string;

  @ApiProperty()
  public readonly description?: string;

  @ApiProperty()
  public readonly linkToDoc?: string;

  @ApiProperty()
  public readonly issueDate?: Date;

  @ApiProperty()
  public readonly expiryDate?: Date;
}
