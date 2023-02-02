import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('me')
  async myInfor() {
    return 'ok';
  }
}
