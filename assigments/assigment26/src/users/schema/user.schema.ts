import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserGender } from '../enums/user-gender.enum';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password!: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  firstName!: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  lastName!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber!: string;

  @Prop({
    type: String,
    enum: UserGender,
    required: true,
  })
  gender!: UserGender;

  @Prop({ type: Number })
  age?: number;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isActive!: boolean;

  @Prop({
    type: Date,
    required: true,
  })
  subscriptionStartDate!: Date;

  @Prop({
    type: Date,
    required: true,
  })
  subscriptionEndDate!: Date;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'expense',
    default: [],
  })
  expenses!: mongoose.Schema.Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
