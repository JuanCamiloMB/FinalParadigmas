import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Address } from "../address/address.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    _id

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

    @Prop({ type:[{ productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product'}, quantity:{type: Number} }], default: [] })
    cart: {productId:string, quantity:number}[]

    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref:'Address' }], default: [] })
    addresses: string[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    defaultAddress:Address;
}

export const UserSchema = SchemaFactory.createForClass(User)