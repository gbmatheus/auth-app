import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async singIn(data: { email: string, pass: string }): Promise<any> {
    const { email, pass } = data;
    if (!email || !pass) throw new Error('Email and password are required');

    const user = await this.userService.findOneByEmail(email);
    if (user.password !== pass) throw new UnauthorizedException();

    delete user.password;

    // TODO: Generate a JWT and return it here
    // instead of the user object

    return user;
  }
}
