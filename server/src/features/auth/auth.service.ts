import {
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import generateToken from './utils';
import { ITokenPayload } from './interfaces/ITokenPayload';
import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import LoginDTO from './interfaces/login.dto';
import { registerDTO } from './interfaces/register.dto';
import { LoginWithFacebookDTO } from './interfaces/loginWithFacebook.dto';

@Injectable()
export class AuthService {
  private ATSecret: string;
  private RTSecret: string;
  private CKPath: string;
  constructor(private usersService: UsersService, private configService: ConfigService) {
    this.ATSecret = this.configService.get('AT_SECRET');
    this.RTSecret = this.configService.get('RT_SECRET');
    this.CKPath = this.configService.get('CK_PATH');
  }

  async generateTokens(data: ITokenPayload) {
    try {
      const [AT, RT] = await Promise.all([
        generateToken(data, this.ATSecret, { expiresIn: '2m' }),
        generateToken({ _id: data._id }, this.RTSecret, { expiresIn: '7d' }),
      ]);

      return {
        accessToken: AT,
        refreshToken: RT,
      };
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }

  async verifyToken(token: string, secret: string) {
    try {
      // verify AT
      const decoded = verify(token, secret) as Partial<ITokenPayload>;

      // find user
      const user = await this.usersService.getUserById(decoded._id);
      if (!user) {
        throw new ForbiddenException();
      }

      return user;
      //
    } catch (error) {
      throw error;
    }
  }

  async verifyAccessToken(accessToken: string) {
    try {
      const user = await this.verifyToken(accessToken, this.ATSecret);
      // console.log(user);
      return user;
    } catch (error) {
      console.log(error.message);
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      }

      throw error;
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    return this.verifyToken(refreshToken, this.RTSecret);
  }

  storeRefreshToken(res: Response, refreshToken: string) {
    res.cookie('rt', refreshToken, {
      sameSite: 'none',
      signed: true,
      httpOnly: true,
      secure: true,
      path: this.CKPath,
    });
  }

  extractRefreshToken(req: Request) {
    try {
      const { rt } = req.signedCookies;
      if (!rt) {
        throw new ForbiddenException();
      }

      return rt as string;
      //
    } catch (error) {
      throw error;
    }
  }

  isTokenExpired(accessToken: string) {
    try {
      // verify AT
      const decoded = verify(accessToken, this.ATSecret) as ITokenPayload;

      return false;
      //
    } catch (error) {
      if (error && error.name === 'TokenExpiredError') {
        return true;
      }
      throw error;
    }
  }

  async register(registerDTO: registerDTO, res: Response) {
    try {
      const user = await this.usersService.createOneUser(registerDTO);

      const { accessToken, refreshToken } = await this.generateTokens({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      });

      this.storeRefreshToken(res, refreshToken);

      return { accessToken };
    } catch (error) {
      // roll back db if error exists
      // TODO...

      // throw error
      throw error;
    }
  }

  async loginProcess(loginDTO: LoginDTO, res: Response) {
    try {
      const user = await this.usersService.findAndVerify(loginDTO);

      const { accessToken, refreshToken } = await this.generateTokens({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      });

      this.storeRefreshToken(res, refreshToken);

      return { accessToken };
    } catch (error) {
      throw error;
    }
  }

  async processRefreshToken(req: Request) {
    try {
      console.log(`refresh token`);
      // don't need to check the access token anymore. the guard did
      const refreshToken = this.extractRefreshToken(req);
      const user = await this.verifyRefreshToken(refreshToken);
      const accessToken = await generateToken(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
        this.ATSecret,
        { expiresIn: '2m' },
      );

      return { accessToken };
      //
    } catch (error) {
      throw error;
    }
  }

  async loginWithFacebookProcess(loginWithFacebookDTO: LoginWithFacebookDTO, res: Response) {
    try {
      const userFoundByEmail = await this.usersService.findUserByEmail(loginWithFacebookDTO.email);
      if (userFoundByEmail) {
        // if find email exist but linked_fb_userid is undefined
        if (!userFoundByEmail.linked_fb_userid) {
          const user = await this.usersService.findAndUpdateLinkedFB(
            `${userFoundByEmail._id}`,
            loginWithFacebookDTO,
          );
          const { accessToken, refreshToken } = await this.generateTokens({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          });

          this.storeRefreshToken(res, refreshToken);

          return { accessToken };
        }

        // if find email exist but linked_fb_userid defined
        const { accessToken, refreshToken } = await this.generateTokens({
          _id: userFoundByEmail._id,
          name: userFoundByEmail.name,
          email: userFoundByEmail.email,
          username: userFoundByEmail.username,
        });

        this.storeRefreshToken(res, refreshToken);

        return { accessToken };
      } else {
        const FbUser = await this.usersService.findAndVerifyFBUser(
          loginWithFacebookDTO.linked_fb_userid,
        );
        console.log(FbUser);

        // if user already logged
        if (FbUser) {
          const { accessToken, refreshToken } = await this.generateTokens({
            _id: FbUser._id,
            name: FbUser.name,
            email: FbUser.email,
            username: FbUser.username,
          });
          this.storeRefreshToken(res, refreshToken);

          return { accessToken };
        } else {
          const user = await this.usersService.createOneFBUser(loginWithFacebookDTO);
          const { accessToken, refreshToken } = await this.generateTokens({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          });

          this.storeRefreshToken(res, refreshToken);

          return { accessToken };
        }
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
