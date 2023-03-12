import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Money, MoneyDocument } from 'src/schemas/money.schema';
import createMoneyNoteDTO from './interfaces/createNote.dto';
import updateMoneyNoteDTO from './interfaces/updateNote.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class MoneyService {
  constructor(@InjectModel(Money.name) private moneyModel: Model<MoneyDocument>) {}

  async createMoneyNote(createMoneyDTO: createMoneyNoteDTO) {
    try {
      const moneyNote = new this.moneyModel(createMoneyDTO);
      await moneyNote.save();
      return moneyNote;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateMoneyNote(updateMoneyNoteDTO: updateMoneyNoteDTO, id: string) {
    try {
      const newNote = {
        updatedAt: Date.now(),
        ...updateMoneyNoteDTO,
      };
      const moneyNote = await this.moneyModel.findByIdAndUpdate(id, newNote);
      return moneyNote;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getNote(date?: string) {
    let noteList;
    try {
      if (date) {
        const dateConvert = dayjs(+date);
        const startTime = dateConvert.startOf('date').toDate();
        const endTime = dateConvert.endOf('date').toDate();
        console.log({ startTime, endTime });

        noteList = await this.moneyModel.find({
          createdAt: {
            $gte: startTime,
            $lt: endTime,
          },
        });
      } else {
        noteList = await this.moneyModel.find().limit(10);
      }
      return noteList;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
