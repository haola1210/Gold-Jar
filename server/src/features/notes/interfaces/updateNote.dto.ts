import { Transform, TransformFnParams } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Currency, SubType, Type } from 'src/constants/MoneyTypeEnum';

export default class updateMoneyNoteDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  subType: SubType;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  type: Type;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  unit: Currency;

  @IsDate()
  forDate: Date;
}
