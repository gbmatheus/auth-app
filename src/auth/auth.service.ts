import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singIn(data: { email: string; password: string }): Promise<any> {
    const { email, password: pass } = data;
    if (!email || !pass) throw new Error('Email and password are required');

    const user = await this.userService.findOneByEmail(email);
    if (user.password !== pass) throw new UnauthorizedException();

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
