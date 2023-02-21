import { AuthController } from './auth.controller';
import { UsersModule } from './../users/users.module';
import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
