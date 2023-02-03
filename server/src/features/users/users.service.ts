import { CreateOneUserDTO } from 'src/common/DTOs/create-one-user.dto';
import { BadRequestException, Injectable, UseFilters, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
// import { MongoException } from 'src/common/exception-filters/MongoException.filter';
import { MongoError } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createOneUser(createOneUserDTO: CreateOneUserDTO): Promise<User> {
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
}
