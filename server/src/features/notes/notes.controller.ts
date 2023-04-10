import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReportType } from 'src/constants/ReportTypeEnum';
import { Public, WithActiveTokenOnly } from '../auth/decorators/token-meta.decorators';
import { AuthGuard } from '../auth/guards/auth.guard';
import { IAttachedUserRequest } from '../auth/interfaces/IAttachedUserRequest';
import createMoneyNoteDTO from './interfaces/createNote.dto';
import { NotesService } from './notes.service';

@UseGuards(AuthGuard)
@Controller('notes')
@Public()
export class NotesController {
  constructor(private notesService: NotesService) {}

  @WithActiveTokenOnly()
  @Get(`note-report`)
  async reportNote(
    @Query() query: { startTime: string; toTime: string; type: ReportType },
    @Req() req: IAttachedUserRequest,
  ) {
    return this.notesService.noteReport(query.startTime, query.toTime, req.user[`_id`]);
  }

  @WithActiveTokenOnly()
  @Get(':id')
  async getNoteById(@Param(`id`) id) {
    return this.notesService.getNoteById(id);
  }

  @WithActiveTokenOnly()
  @Post('create-one')
  async createNote(@Body() createMoneyNote: createMoneyNoteDTO, @Req() req: IAttachedUserRequest) {
    const { user } = req;
    return this.notesService.createMoneyNote(createMoneyNote, user[`_id`]);
  }

  @WithActiveTokenOnly()
  @Put(`:id`)
  async updateNote(@Body() updateMoneyNoteDTO, @Param(`id`) id) {
    return this.notesService.updateMoneyNote(updateMoneyNoteDTO, id);
  }

  @WithActiveTokenOnly()
  @Delete('note-all')
  async deleteAllRecord() {
    return this.notesService.deleteAllRecord();
  }

  @WithActiveTokenOnly()
  @Delete(`:id`)
  async deleteNote(@Param(`id`) id) {
    return this.notesService.deleteNote(id);
  }
}
