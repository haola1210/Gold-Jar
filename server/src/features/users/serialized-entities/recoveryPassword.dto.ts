import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export default class recoveryPassword {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  username: string;

  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;
}
