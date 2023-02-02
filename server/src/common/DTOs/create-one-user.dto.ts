import { IsString, IsNotEmpty, MinLength, Length, IsLowercase, IsEmail } from 'class-validator';

export class CreateOneUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 25)
  @IsLowercase()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsLowercase()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
