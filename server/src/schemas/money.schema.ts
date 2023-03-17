import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Currency, MoneyType } from 'src/constants/MoneyTypeEnum';
import { IForDate } from 'src/features/money/interfaces/IForDate';

export type MoneyDocument = HydratedDocument<Money>;

@Schema()
export class Money {
  @Prop({
    type: String,
    enum: MoneyType,
    required: true,
    index: 'text',
  })
  type: MoneyType;

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

  @Prop({
    type: raw({
      day: { type: Number },
      month: { type: Number },
      year: { type: Number },
    }),
    required: true,
  })
  forDate: IForDate;
}

export const MoneySchema = SchemaFactory.createForClass(Money);
