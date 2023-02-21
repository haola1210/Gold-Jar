import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_META, AUTH_TOKEN_META } from './interfaces/auth.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const controller = context.getClass();

    const handlerOverrideController =
      this.reflector.getAllAndOverride(AUTH_META.TOKEN_META, [handler, controller]) ??
      AUTH_TOKEN_META.PUBLIC;

    console.log(handlerOverrideController);

    return true;
  }
}
