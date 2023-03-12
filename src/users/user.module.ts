import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  // exports: [] // * para expor um provider entre os modulos que importam o modulo
  // provider expostos internamente no modulo
})
export class UserModule {}
