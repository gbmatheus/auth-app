import { Injectable } from '@nestjs/common';
import { User as IUser } from './interfaces/user.interface';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(user: IUser): Promise<User> {
    const { password } = user;

    const userExist = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userExist != null) throw new Error('This email is already registered');

    if (password !== user['confirmPassword'])
      throw new Error('Password and confirm password no match');

    delete user['confirmPassword'];

    // const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
    // console.log({ hash });
    // user.password = hash;

    const userCreated = await this.userRepository.create({
      data: {
        email: user.email,
        // password: hash,
        password: password,
      },
    });

    delete user.password;
    return userCreated;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, user: IUser): Promise<User> {
    return this.userRepository.update({
      data: {
        ...user,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<User> {
    return this.userRepository.remove({
      where: {
        id,
      },
    });
  }
}
