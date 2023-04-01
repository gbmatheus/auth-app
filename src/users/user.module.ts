import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, UsersService],
  controllers: [UsersController],
  // exports: [] // * para expor um provider entre os modulos que importam o modulo
  // provider expostos internamente no modulo
})
export class UsersModule {}
