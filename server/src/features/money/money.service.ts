import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Money, MoneyDocument } from 'src/schemas/money.schema';
import createMoneyNoteDTO from './interfaces/createNote.dto';
import updateMoneyNoteDTO from './interfaces/updateNote.dto';

@Injectable()
export class MoneyService {
  constructor(@InjectModel(Money.name) private moneyModel: Model<MoneyDocument>) {}

  async createMoneyNote(createMoneyDTO: createMoneyNoteDTO) {
    try {
      const moneyNote = new this.moneyModel(createMoneyDTO);
      await moneyNote.save();
      console.log(moneyNote);
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

  async getNote(day?: string, month?: string, year?: string) {
    let noteList;
    try {
      if (day !== undefined && month !== undefined && year !== undefined) {
        noteList = await this.moneyModel.find({
          'forDate.day': Number(day),
          'forDate.month': Number(month),
          'forDate.year': Number(year),
        });
        console.log(noteList);
      } else {
        noteList = await this.moneyModel.find().limit(10);
      }
      return noteList;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
