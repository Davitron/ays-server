import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeValidate,
  BeforeCreate,
  Default,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { IDefineOptions } from '../../../shared';
import { BadRequestException, HttpException } from '@nestjs/common';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { Profile } from './profile.entity';

const tableOptions: IDefineOptions = {
  timestamp: true,
  tableName: 'educations',
} as IDefineOptions;

@Table(tableOptions)
export class Education extends Model<Education> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
  })
  institution: string;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  degree: string;

  @Column({
    type: DataType.CHAR(10),
    allowNull: false,
  })
  course: string;

  @Column({
    type: DataType.CHAR(500),
  })
  description: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  endDate: Date;

  @ForeignKey(() => Profile)
  @Column
  profileId: number;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
