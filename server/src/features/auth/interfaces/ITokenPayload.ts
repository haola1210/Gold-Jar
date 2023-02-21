import { Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export interface ITokenPayload extends Pick<User, 'email' | 'name' | 'username'> {
  _id: Types.ObjectId;
}
