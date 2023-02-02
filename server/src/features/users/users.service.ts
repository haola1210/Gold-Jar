import { CreateOneUserDTO } from 'src/common/DTOs/create-one-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createOneUser(createOneUserDTO: CreateOneUserDTO) {
    try {
      const { password, ...rest } = createOneUserDTO;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const data = {
        ...rest,
        password: hashedPassword,
      };
    } catch (error) {}
  }
}
