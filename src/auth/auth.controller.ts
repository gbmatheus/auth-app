import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(@Body() singInDto: SingInDto) {
    return this.authService.singIn(singInDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('loged')
  getProfileJwt(@Request() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  singInGoogle(@Request() req) {
    return;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  singInGoogleRedirect(@Req() req) {
    return this.authService.singInGoogle(req);
  }
}
