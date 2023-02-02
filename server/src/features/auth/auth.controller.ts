import { Controller, Post } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register() {
    return 'OK';
  }

  @Post('login')
  async login() {
    return 'OK';
  }
}
