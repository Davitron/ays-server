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
import { Profile } from './profile.entity';

const tableOptions: IDefineOptions = {
  timestamp: true,
  tableName: 'work_experience',
} as IDefineOptions;

@Table(tableOptions)
export class WorkExperience extends Model<WorkExperience> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  company: string;

  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  position: string;

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
