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
  HasOne,
} from 'sequelize-typescript';
import { IDefineOptions } from '../../shared';
import { BadRequestException, HttpException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Profile } from '../profile/entities/profile.entity';

const tableOptions: IDefineOptions = {
  timestamp: true,
  tableName: 'users',
} as IDefineOptions;

type Roles = 'JOBSEEKER|RECRUITER|ADMIN';

@Table(tableOptions)
export class User extends Model<User> {
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
    validate: {
        isEmail: true,
        isUnique: async (value: string,  done: (error: any) => any): Promise<any> => {
          const isExist = await User.findOne({ where: { email: value } });
          if (isExist) {
            return done(new Error('Email Exist'));
          }
          return done(null);
        },
    },
  })
  public email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public password: string;

  @Default('JOBSEEKER')
  @Column({type: DataType.ENUM('JOBSEEKER', 'RECRUITER', 'ADMIN')})
  public role: Roles;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public isVerified: boolean;

  @HasOne(() => Profile)
  profile: Profile;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @BeforeValidate
  public static validateData(user: User, options: any) {
    if (!options.transaction) { throw new HttpException('Missing Transactions', 500); }
    if (!user.email || !user.password) {
      throw new BadRequestException('Missing Parameters');
    }
  }

  @BeforeCreate
  public static async hashPassword(user: User, options: any) {
    if (!options.transaction) { throw new HttpException('Missing Transactions', 500); }
    user.password = crypto.createHmac('sha256', user.password).digest('hex');
    user.role.toUpperCase();
  }
}
