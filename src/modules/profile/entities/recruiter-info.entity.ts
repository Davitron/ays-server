import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { IDefineOptions } from '../../../shared';
import { Profile } from './profile.entity';

const tableOptions: IDefineOptions = {
  timestamp: true,
  tableName: 'recruiter_info',
} as IDefineOptions;

@Table(tableOptions)
export class RecruiterInfo extends Model<RecruiterInfo> {
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
    type: DataType.CHAR(100),
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.CHAR(15),
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.CHAR(100),
  })
  website: string;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  referer: string;

  @ForeignKey(() => Profile)
  @Column
  profileId: number;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
