import { applyDecorators } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const NotEmptyString = () =>
  applyDecorators(
    IsString(),
    IsNotEmpty(),
    Transform(({ value }: TransformFnParams) => value?.trim()),
  );
export class LoginWithFacebookDTO {
  @NotEmptyString()
  name: string;

  @NotEmptyString()
  username: string;

  @NotEmptyString()
  email: string;

  @NotEmptyString()
  linked_fb_userid: string;

  @NotEmptyString()
  token: string;
}
