import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { Note, NoteDocument } from 'src/schemas/note.schema';
import createMoneyNoteDTO from './interfaces/createNote.dto';
import updateMoneyNoteDTO from './interfaces/updateNote.dto';
import * as moment from 'moment';

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

  async deleteNote(id: string): Promise<DeleteResult> {
    try {
      if (id) {
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
      const note = await this.noteModel.findOne({ _id: id });
      return note;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async noteReport(startTime: string, toTime: string, owner: string) {
    try {
      console.log('toTime', toTime);
      console.log('startTime', startTime);
      const startTimeConvert = moment.utc(+startTime);
      const toTimeConvert = moment.utc(+toTime);
      console.log({ startTimeConvert, toTimeConvert });
      const noteList = await this.noteModel.find({
        forDate: {
          $gte: startTimeConvert,
          $lt: toTimeConvert,
        },
        owner: owner,
      });
      return noteList;
    } catch (error) {
      throw error;
    }
  }
}
