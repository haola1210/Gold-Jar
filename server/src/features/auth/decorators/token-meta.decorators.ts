import { SetMetadata } from '@nestjs/common';
import { AuthEnum, AuthMetaEnum } from '../auth.types';

export const Public = () => SetMetadata(AuthMetaEnum.TOKEN_META, AuthEnum.PUBLIC);

export const WithoutTokenOnly = () =>
  SetMetadata(AuthMetaEnum.TOKEN_META, AuthEnum.WITHOUT_TOKEN_ONLY);

export const WithActiveTokenOnly = () =>
  SetMetadata(AuthMetaEnum.TOKEN_META, AuthEnum.WITH_ACTIVE_TOKEN_ONLY);

export const WithExpiredTokenOnly = () =>
  SetMetadata(AuthMetaEnum.TOKEN_META, AuthEnum.WITH_EXPIRED_TOKEN_ONLY);
