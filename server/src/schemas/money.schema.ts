import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Currency, MoneyType } from 'src/constants/MoneyTypeEnum';

export type MoneyDocument = HydratedDocument<Money>;

@Schema()
export class Money {
  @Prop({
    type: String,
    enum: MoneyType,
    required: true,
  })
  type: MoneyType;

  @Prop({ required: true })
  amount: number;

  @Prop({})
  desciption: string;

  @Prop({ type: String, enum: Currency, default: Currency.VND })
  unit: Currency;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const MoneySchema = SchemaFactory.createForClass(Money);

MoneySchema.index({ unit: 'text' });
