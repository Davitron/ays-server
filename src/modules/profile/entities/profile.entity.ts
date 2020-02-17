import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Default,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { IDefineOptions } from '../../../shared';
import { User } from '../../users/user.entity';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { Certification } from './certification.entity';

const tableOptions: IDefineOptions = {
  timestamp: true,
  tableName: 'profiles',
} as IDefineOptions;

@Table(tableOptions)
export class Profile extends Model<Profile> {
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
  })
  public title: string;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  public firstName: string;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  public lastName: string;

  @Column({
    type: DataType.CHAR(500),
  })
  public headline: string;

  @Column({
    type: DataType.CHAR(50),
  })
  public profilePic: string;

  @Column({
    type: DataType.CHAR(30),
  })
  public country: string;

  @Column({
    type: DataType.CHAR(30),
  })
  public state: string;

  @Column({
    type: DataType.CHAR(30),
  })
  public phoneNumber: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public profileViews: number;

  @HasMany(() => Education)
  education?: Education[];

  @HasMany(() => WorkExperience)
  workExperience?: WorkExperience[];

  @HasMany(() => Certification)
  certifications?: Certification[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

}
