import { User } from '../user.entity';
import { IUser } from './user.interface';

export interface IUserService {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findOne(options: object): Promise<User | null>;
  create(user: IUser): Promise<User>;
  update(id: number, newValue: IUser): Promise<User | null>;
}
