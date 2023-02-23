import { Request } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';

export interface IAttachedUserRequest extends Request {
  user: User;
}
