import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { Public, WithActiveTokenOnly } from '../auth/decorators/token-meta.decorators';
import { AuthGuard } from '../auth/guards/auth.guard';
import { IAttachedUserRequest } from '../auth/interfaces/IAttachedUserRequest';
import createMoneyNoteDTO from './interfaces/createNote.dto';
import { NoteService } from './note.service';

@UseGuards(AuthGuard)
@Controller('note')
@Public()
export class NoteController {
  constructor(private noteService: NoteService) {}

  @WithActiveTokenOnly()
  @Get(``)
  async getNote(@Req() req: IAttachedUserRequest) {
    const { day, month, year } = req.query;
    const { user } = req;

    return this.noteService.getNote(day as string, month as string, year as string, user[`_id`]);
  }

  @WithActiveTokenOnly()
  @Get(':id')
  async getNoteById(@Param(`id`) id) {
    return this.noteService.getNoteById(id);
  }

  @WithActiveTokenOnly()
  @Post('')
  async createNote(@Body() createMoneyNote: createMoneyNoteDTO, @Req() req: IAttachedUserRequest) {
    const { user } = req;
    return this.noteService.createMoneyNote(createMoneyNote, user[`_id`]);
  }

  @WithActiveTokenOnly()
  @Put(`:id`)
  async updateNote(@Body() updateMoneyNoteDTO, @Param(`id`) id) {
    return this.noteService.updateMoneyNote(updateMoneyNoteDTO, id);
  }

  @WithActiveTokenOnly()
  @Delete('note-all')
  async deleteAllRecord() {
    return this.noteService.deleteAllRecord();
  }

  @WithActiveTokenOnly()
  @Delete(`:id`)
  async deleteNote(@Param(`id`) id) {
    return this.noteService.deleteNote(id);
  }
}
