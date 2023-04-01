import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(@Body() singInDto: SingInDto) {
    // jwt
    return this.authService.singIn(singInDto);
  }

  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
