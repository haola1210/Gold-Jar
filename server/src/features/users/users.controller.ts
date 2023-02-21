import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Public, WithActiveTokenOnly } from '../auth/decorators/token-meta.decorators';

@Controller('users')
@UseGuards(AuthGuard)
@Public()
export class UsersController {
  //

  @Get('me')
  @WithActiveTokenOnly()
  async myInfor() {
    return 'ok';
  }

  @Get('something')
  async something() {
    return 'ok';
  }
}
