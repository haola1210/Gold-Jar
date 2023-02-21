import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { registerDTO } from '../auth/interfaces/register.dto';
import LoginDTO from '../auth/interfaces/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
      // const cachedUser = await this.cacheManager.get<User>(`USER_ID_${id}`);
      // if (cachedUser) {
      //   console.log('user from cache');
      //   return cachedUser;
      // }

      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException();
      }

      // console.log('user from db, cache this now');
      // await this.cacheManager.set(`USER_ID_${id}`, user);

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
}
