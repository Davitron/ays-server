import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, BadRequestException } from '@nestjs/common';
import {  UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  public async listAll(@Res() res) {
      const users = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  public async add(@Body() body, @Res() res) {
      if (!body || (body && Object.keys(body).length === 0)) {
        throw new  BadRequestException('Missing user Information');
      }
      await this.usersService.create(body);
      return res.status(HttpStatus.CREATED).send();
  }

  @Get(':id')
  public async show(@Param('id') id: number, @Res() res) {
      const user = await this.usersService.findById(id);
      return res.status(HttpStatus.OK).json(user);
  }

  @Put(':id')
  public async update(@Body() body, @Param('id') id: number, @Res() res) {
      await this.usersService.update(id, body);
      return res.status(HttpStatus.OK).send();
  }
}
