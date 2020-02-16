import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {

  @ApiProperty()
  public readonly title?: string;

  @ApiProperty()
  public readonly firstName: string;

  @ApiProperty()
  public readonly lastName: string;

  @ApiProperty()
  public readonly profilePic?: string;

  @ApiProperty()
  public readonly country?: string;

  @ApiProperty()
  public readonly state?: string;

  @ApiProperty()
  public readonly phoneNumber?: string;

  @ApiProperty()
  public readonly profileViews?: string;

  @ApiProperty()
  public readonly userId?: number;
}
