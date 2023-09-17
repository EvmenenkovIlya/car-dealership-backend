import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PrimaryGeneratedColumn } from 'typeorm';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @PrimaryGeneratedColumn()
  id: number;

  @Prop()
  name: string;

  @Prop()
  login: string;

  @Prop()
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);