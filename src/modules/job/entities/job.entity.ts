import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BeforeValidate,
} from 'sequelize-typescript';
import { IDefineOptions } from '../../../shared';
import { Profile } from '../../profile/entities/profile.entity';
import { HttpException, BadRequestException } from '@nestjs/common';

const tableOptions: IDefineOptions = {
  timestamp: true,
  tableName: 'jobs',
} as IDefineOptions;

type EmploymentType = 'FULLTIME|CONTRACT';

@Table(tableOptions)
export class Job extends Model<Job> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  location: string;

  @Column({
    type: DataType.ENUM('FULLTIME', 'CONTRACT'),
    allowNull: false,
  })
  public type: EmploymentType;

  @Column({
    type: DataType.CHAR(1000),
    allowNull: false,
  })
  public description: string;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  public address: string;

  @Column({
    type: DataType.CHAR(150),
    allowNull: false,
  })
  public motivation: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  public benefits: string[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public minCompensation: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public maxCompensation: number;

  @ForeignKey(() => Profile)
  @Column
  employerId: number;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @BeforeValidate
  public static validateData(job: Job, options: any) {
    if (!options.transaction) { throw new HttpException('Missing Transactions', 500); }
    if (job.minCompensation > job.maxCompensation) {
      throw new BadRequestException('maximum comensation must be greater than minimum compensation');
    }
    if(!job.employerId) {
      throw new BadRequestException('employer details not included');
    }
  }

}
