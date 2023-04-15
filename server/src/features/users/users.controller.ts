import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Public, WithActiveTokenOnly } from '../auth/decorators/token-meta.decorators';
import { IAttachedUserRequest } from '../auth/interfaces/IAttachedUserRequest';
import { ResponsedUser } from './serialized-entities/ResponsedUser';
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

  @WithActiveTokenOnly()
  @Post(`/change-name`)
  async updateNameOfUser(@Request() req: IAttachedUserRequest, @Body() body: { name: string }) {
    return this.userServices.updateNameOfUser(`63fc5f929bd4ad447d7b97ea`, body.name);
  }

  @WithActiveTokenOnly()
  @Post(`/change-pass`)
  async updatePasswordOfUser(
    @Request() req: IAttachedUserRequest,
    @Body() body: { oldPass: string; newPass: string },
  ) {
    return this.userServices.updatePasswordOfUser(req.user[`_id`], body.oldPass, body.newPass);
  }
}
