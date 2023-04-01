import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Redirect,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(createUserDto);
    console.log(user);
    return { user };
  }

  @Get(':id')
  findOne(@Param() params): string {
    return `Get a #${params.id} user`;
  }

  // ! É possível definir qual parâemtro da requisão pegar
  // @Get(':name')
  // findOneByName(@Param('name') name: string): string {
  //   return `Get a #${name} username`;
  // }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return `updated user with id #${id} - old password ${updateUserDto.password}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `deleted user with id #${id}`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5')
      return { url: 'https://docs.nestjs.com/v5/' };
  }
}
