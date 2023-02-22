import { Body, Controller, Post, Res, Req, Get, UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { registerDTO } from './interfaces/register.dto';
import { Response, Request } from 'express';
import LoginDTO from './interfaces/login.dto';
import { WithExpiredTokenOnly, WithoutTokenOnly } from './decorators/token-meta.decorators';
import { AuthGuard } from './guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  //
  constructor(private authService: AuthService) {}

  @WithoutTokenOnly()
  @Post('register')
  async register(@Body() registerDTO: registerDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(registerDTO, res);
  }

  @WithoutTokenOnly()
  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginProcess(loginDTO, res);
  }

  @WithExpiredTokenOnly()
  @Get('refresh-token')
  async refreshToken(@Req() req: Request) {
    return this.authService.processRefreshToken(req);
  }
}
