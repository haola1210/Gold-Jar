import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/schemas/note.schema';
import { AuthModule } from '../auth/auth.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class MoneyModule {}
