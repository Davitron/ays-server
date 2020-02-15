import { ApiProperty } from '@nestjs/swagger';

export class WorkExperienceDto {
  @ApiProperty()
  public readonly company: string;

  @ApiProperty()
  public readonly position: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly startDate: Date;

  @ApiProperty()
  public readonly endDate: Date;
}
