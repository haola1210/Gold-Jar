import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../auth/decorators/token-meta.decorators';
import { AuthGuard } from '../auth/guards/auth.guard';
import createMoneyNoteDTO from './interfaces/createNote.dto';
import { MoneyService } from './money.service';

@UseGuards(AuthGuard)
@Controller('money')
@Public()
export class MoneyController {
  constructor(private moneyService: MoneyService) {}

  @Get(`note`)
  async getNote(@Req() req: Request) {
    const { day, month, year } = req.query;
    console.log({ day, month, year });

    return this.moneyService.getNote(day as string, month as string, year as string);
  }

  @Post('note')
  async createNote(@Body() createMoneyNote: createMoneyNoteDTO) {
    console.log(createMoneyNote);
    return this.moneyService.createMoneyNote(createMoneyNote);
  }

  @Put(`note/:id`)
  async updateNote(@Body() updateMoneyNoteDTO, @Param(`id`) id) {
    return this.moneyService.updateMoneyNote(updateMoneyNoteDTO, id);
  }
}
