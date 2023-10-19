import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Address } from "../address/address.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop({ required: true, unique: true })
    email:string;

    @Prop({ required: true })
    password:string;

    @Prop({ required: true })
    name: string;

    @Prop()
    phone:string;

    @Prop()
    TwoFA:boolean;

    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref:'Product' }], default: [] })
    cart: string[]

    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref:'Address' }], default: [] })
    addresses: string[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    defaultAddress:Address;
}

export const UserSchema = SchemaFactory.createForClass(User)