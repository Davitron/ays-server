import { ApiProperty } from '@nestjs/swagger';

export class UpdateEducationDto {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly institution?: string;

  @ApiProperty()
  public readonly degree?: string;

  @ApiProperty()
  public readonly areaOfStudy?: string;

  @ApiProperty()
  public readonly activities?: string;

  @ApiProperty()
  public readonly startDate?: Date;

  @ApiProperty()
  public readonly endDate?: Date;
}
