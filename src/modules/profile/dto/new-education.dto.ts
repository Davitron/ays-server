import { ApiProperty } from '@nestjs/swagger';

export class NewEducationDto {
  @ApiProperty()
  public readonly institution: string;

  @ApiProperty()
  public readonly degree: string;

  @ApiProperty()
  public readonly areaOfStudy: string;

  @ApiProperty()
  public readonly activities: string;

  @ApiProperty()
  public readonly startDate: Date;

  @ApiProperty()
  public readonly endDate: Date;
}
