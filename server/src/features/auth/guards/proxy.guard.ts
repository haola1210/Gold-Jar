import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ProxyGuard implements CanActivate {
  constructor(private reflector: Reflector, private configServ: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const proxied = request.headers['proxied'];

    if (this.configServ.get('MODE') === 'dev') {
      return true;
    }

    if (proxied === 'nginx') {
      return true;
    }

    return false;
  }
}
