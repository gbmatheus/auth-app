import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
  // exports: [] // * para expor um provider entre os modulos que importam o modulo
  // deveras exportar o modulo do usuário?
  // provider expostos internamente no modulo
})
export class UsersModule {}
