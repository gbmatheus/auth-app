import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneByEmail(params: { email: string }): Promise<User> {
    const { email } = params;
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(
    email: string,
    params: { data: Prisma.UserUpdateInput },
  ): Promise<User> {
    const { data } = params;
    return this.prisma.user.update({
      where: {
        email,
      },
      data,
    });
  }

  async remove(email: string): Promise<void> {
    this.prisma.user.delete({
      where: { email },
    });
  }
}
