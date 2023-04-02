import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SingInDto } from './dto/sing-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(singInDto: SingInDto) {
    const { email, password } = singInDto;
    if (!email || !password) throw new Error('Email and password are required');

    const user = await this.userService.findOneByEmail(email);
    // TODO: adicionar bcrypt na verificação da senha
    if (!user || user.password !== password) throw new UnauthorizedException();

    delete user.password;
    return user;
  }

  async singIn(singInDto: SingInDto): Promise<any> {
    const user = await this.validateCredentials(singInDto);

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
