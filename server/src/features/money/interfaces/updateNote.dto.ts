import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Currency, MoneyType } from 'src/constants/MoneyTypeEnum';
import { IForDate } from './IForDate';

export default class updateMoneyNoteDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  type: MoneyType;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  unit: Currency;

  @IsObject()
  forDate: IForDate;
}
