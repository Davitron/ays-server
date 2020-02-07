import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  @ApiProperty()
  public readonly firstName: string;

  @ApiProperty()
  public readonly lastName: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;

  @ApiProperty({ enum: ['JOBSEEKER', 'RECRUITER', 'ADMIN']})
  public readonly role: string;
}
