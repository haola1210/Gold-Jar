import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Currency, SubType, Type } from 'src/constants/MoneyTypeEnum';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({
    type: String,
    enum: SubType,
    required: true,
    index: 'text',
  })
  subType: SubType;

  @Prop({
    type: String,
    enum: Type,
    required: true,
    index: 'text',
  })
  type: Type;

  @Prop({ required: true })
  amount: number;

  @Prop({})
  description: string;

  @Prop({ type: String, enum: Currency, default: Currency.VND })
  unit: Currency;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ required: true })
  forDate: Date;

  @Prop()
  owner: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
