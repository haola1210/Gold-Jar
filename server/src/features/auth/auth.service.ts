import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateOneUserDTO } from 'src/common/DTOs/create-one-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDTO: CreateOneUserDTO) {
    return this.usersService.createOneUser(registerDTO);
  }
}
