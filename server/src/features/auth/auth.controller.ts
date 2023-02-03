import { Body, Controller, Post } from '@nestjs/common/decorators';
import { CreateOneUserDTO } from 'src/common/DTOs/create-one-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  //
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDTO: CreateOneUserDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  async login() {
    return 'OK';
  }
}
