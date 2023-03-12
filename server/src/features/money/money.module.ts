import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Money, MoneySchema } from 'src/schemas/money.schema';
import { AuthModule } from '../auth/auth.module';
import { MoneyController } from './money.controller';
import { MoneyService } from './money.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Money.name, schema: MoneySchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [MoneyController],
  providers: [MoneyService],
  exports: [MoneyService],
})
export class MoneyModule {}
