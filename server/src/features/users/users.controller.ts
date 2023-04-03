import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Public, WithActiveTokenOnly } from '../auth/decorators/token-meta.decorators';
import { IAttachedUserRequest } from '../auth/interfaces/IAttachedUserRequest';
import { ResponsedUser } from './serialized-entities/ResponsedUser';
import recoveryPassword from './serialized-entities/recoveryPassword.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
@Public()
export class UsersController {
  constructor(private userServices: UsersService) {}
  //

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  @WithActiveTokenOnly()
  async myInfor(@Req() req: IAttachedUserRequest) {
    return new ResponsedUser(req.user);
  }

  @Get('something')
  async something() {
    return 'ok';
  }
}
