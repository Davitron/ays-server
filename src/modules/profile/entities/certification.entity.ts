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
  tableName: 'certifications',
} as IDefineOptions;

@Table(tableOptions)
export class Certification extends Model<Certification> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  organization: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  linkToDoc: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  issueDate: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  expiryDate: Date;

  @ForeignKey(() => Profile)
  @Column
  profileId: number;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
