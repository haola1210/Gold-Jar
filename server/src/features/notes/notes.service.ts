import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { Note, NoteDocument } from 'src/schemas/note.schema';
import createMoneyNoteDTO from './interfaces/createNote.dto';
import updateMoneyNoteDTO from './interfaces/updateNote.dto';
import * as moment from 'moment';
import { ReportType } from 'src/constants/ReportTypeEnum';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async createMoneyNote(createMoneyDTO: createMoneyNoteDTO, owner?: string) {
    try {
      const payload = {
        owner,
        ...createMoneyDTO,
      };
      const moneyNote = new this.noteModel(payload);
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
      const moneyNote = await this.noteModel.findByIdAndUpdate(id, newNote);
      return moneyNote;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getNote(day?: string, month?: string, year?: string, owner?: string) {
    let noteList;

    try {
      if (day !== undefined && month !== undefined && year !== undefined) {
        noteList = await this.noteModel.find({
          'forDate.day': Number(day),
          'forDate.month': Number(month),
          'forDate.year': Number(year),
          owner,
        });
      } else {
        noteList = await this.noteModel.find().limit(10);
      }
      return noteList;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteNote(id: string): Promise<DeleteResult> {
    try {
      if (id) {
        console.log(id);
        const note = await this.noteModel.deleteOne({ _id: id });
        return note;
      }

      throw new BadRequestException();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteAllRecord(): Promise<any> {
    try {
      const nodeDelete = await this.noteModel.deleteMany({});
      return nodeDelete;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getNoteById(id: string) {
    try {
      const note = await this.noteModel.find({ _id: id });
      return note[0];
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getNoteByMonth(id: string, month: number, year: number) {
    try {
      const noteList = await this.noteModel.find({
        owner: id,
        'forDate.month': month,
        'forDate.year': year,
      });
      return noteList;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async noteReport(startTime: string, toTime: string, owner: string, type: ReportType) {
    try {
      switch (type) {
        case ReportType.DAY:
          const day = moment(+startTime);
          console.log(day.date(), day.month(), day.year());
          const noteList = await this.noteModel.find({
            'forDate.day': day.date(),
            'forDate.month': day.month(),
            'forDate.year': day.year(),
            owner: owner,
          });
          return noteList;
        default:
          return ``;
      }
    } catch (error) {
      throw error;
    }
  }
}
