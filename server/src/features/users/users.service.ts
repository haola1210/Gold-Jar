import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
  CACHE_MANAGER,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { registerDTO } from '../auth/interfaces/register.dto';
import LoginDTO from '../auth/interfaces/login.dto';
import { Cache } from 'cache-manager';
import { LoginWithFacebookDTO } from '../auth/interfaces/loginWithFacebook.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createOneUser(createOneUserDTO: registerDTO) {
    try {
      const { password, ...rest } = createOneUserDTO;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const data = {
        ...rest,
        password: hashedPassword,
      };

      const user = new this.userModel(data);
      await user.save();

      return user;
      //
    } catch (error) {
      // console.log(error);
      if (error.code === 11000) {
        throw new ConflictException(JSON.stringify(error.keyValue));
      }
      throw new BadRequestException();
    }
  }

  async getUserById(id: Types.ObjectId) {
    try {
      const cachedUser = await this.cacheManager.get<UserDocument>(`USER_ID_${id}`);
      if (cachedUser) {
        console.log('user from cache');
        return cachedUser;
      }

      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException();
      }

      console.log('user from db, cache this now');
      await this.cacheManager.set(`USER_ID_${id}`, user);

      return user;
      //
    } catch (error) {
      throw error;
    }
  }

  async findAndVerify(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    try {
      const user = await this.userModel.findOne({ username });

      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) {
        throw new BadRequestException('Password is not correct');
      }

      return user;
      //
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAndUpdateLinkedFB(id: string, user: LoginWithFacebookDTO) {
    try {
      const userUpdated = await this.userModel.findByIdAndUpdate(id, {
        linked_fb_userid: user.linked_fb_userid,
      });
      return userUpdated;
    } catch (error) {
      throw error;
    }
  }

  async createOneFBUser(loginWithFacebookDTO: LoginWithFacebookDTO) {
    try {
      const user = new this.userModel(loginWithFacebookDTO);
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAndVerifyFBUser(linkedFbUserid: string) {
    try {
      const FbUser = await this.userModel.findOne({ linked_fb_userid: linkedFbUserid });
      return FbUser;
    } catch (error) {
      throw error;
    }
  }

  async updateNameOfUser(id: string, name: string) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, { name }, { new: true });
      if (user) {
        await this.cacheManager.set(`USER_ID_${id}`, user);
        return user;
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updatePasswordOfUser(id: string, oldPass: string, newPass: string) {
    try {
      const salt = await bcrypt.genSalt();

      const user = await this.userModel.findOne({ _id: id });
      // const compare = await bcrypt.compare(password, user.password);

      if (await bcrypt.compare(oldPass, user.password)) {
        if (await bcrypt.compare(newPass, user.password)) {
          throw new ConflictException();
        }
        const hashedNewPassword = await bcrypt.hash(newPass, salt);

        const newUser = await this.userModel.findByIdAndUpdate(id, { password: hashedNewPassword });
        return newUser;
      } else {
        throw new NotFoundException('Wrong old password');
      }
    } catch (error) {
      throw error;
    }
  }
}
