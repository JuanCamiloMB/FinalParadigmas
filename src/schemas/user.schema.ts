import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Address } from "./address.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop({ required: true })
    email:string;

    @Prop({ required: true })
    password:string;

    @Prop({ required: true })
    name: string;

    @Prop()
    phone:number;

    @Prop()
    TwoFA:boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    defaultAddress:Address;
}

export const UserSchema = SchemaFactory.createForClass(User)