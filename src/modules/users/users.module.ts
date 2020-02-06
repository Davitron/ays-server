import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProvider } from './user.provider';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, usersProvider],
  controllers: [UsersController],
  exports: [UserService]
})
export class UsersModule {}
