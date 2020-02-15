import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IUser, IUserService } from './interfaces';
import { User } from './user.entity';

interface CreateOptions {
  returning?: boolean;
  transaction: any;
}

@Injectable()
export class UserService implements IUserService {

  constructor(
    @Inject('UserRepository') private readonly userRepository: typeof User,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  public async findById(id: number): Promise<User | null> {
    return await this.userRepository.findByPk<User>(id);
  }

  public async findOne(options: object): Promise<User> {
    return await this.userRepository.findOne<User>(options);
  }

  public async create(user: IUser): Promise<User> {
    try {
      return await this.sequelizeInstance.transaction(async transaction => {
        return await this.userRepository.create<User>(user, {
          returning: true,
          transaction,
        } as CreateOptions);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async update(id: number, newValue: IUser): Promise<User> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let user = await this.userRepository.findByPk<User>(id, {
          transaction,
      });
      // tslint:disable-next-line: curly
      if (!user) throw new NotFoundException('USER IS NOT FOUND');
      user = this._assign(user, newValue);
      return await user.save({
          returning: true,
          transaction,
      } as CreateOptions);
    });
  }

  private _assign(user: User, newValue: IUser): User {
    for (const key of Object.keys(user.toJSON())) {
        // tslint:disable-next-line: curly
        if (user[key] !== newValue[key]) {
          user[key] = newValue[key];
        }
    }
    return user as User;
  }
}
