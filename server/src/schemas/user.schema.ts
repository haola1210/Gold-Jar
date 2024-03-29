import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, trim: true, minlength: 3 })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true, unique: true, minlength: 6, maxlength: 25 })
  username: string;

  @Prop({ required: true, trim: true, lowercase: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true, minlength: 8 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({
  name: 'text',
  username: 'text',
  email: 'text',
});
