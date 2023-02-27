export interface IUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IAuthRes {
  accessToken: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}
