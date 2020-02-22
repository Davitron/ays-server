import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class UpdateRecruiterInfoDto {
  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  public readonly company?: string;

  @IsOptional()
  @MaxLength(100)
  @ApiProperty()
  public readonly address?: string;

  @IsOptional()
  @MaxLength(100)
  @ApiProperty()
  public readonly website?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly position?: string;

  @IsOptional()
  @MaxLength(15)
  @ApiProperty()
  public readonly phoneNumber?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty()
  public readonly referer?: string;
}
