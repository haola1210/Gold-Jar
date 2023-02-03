import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthEnum, AuthMetaEnum } from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const controller = context.getClass();

    const handlerOverrideController =
      this.reflector.getAllAndOverride(AuthMetaEnum.TOKEN_META, [handler, controller]) ??
      AuthEnum.PUBLIC;

    console.log(handlerOverrideController);

    return true;
  }
}
