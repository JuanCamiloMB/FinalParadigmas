import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../users/user.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop()
  country: string;

  @Prop()
  name: string;

  @Prop()
  street_address: string;

  @Prop()
  internal_address: string;

  @Prop()
  city: string;

  @Prop()
  region: string;

  @Prop()
  zip: number;

  @Prop()
  phone: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  resident: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
