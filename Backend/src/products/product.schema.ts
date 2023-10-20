import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product{
    @Prop({ required: true })
    name:string;

    @Prop({ required: true })
    price:string;

    @Prop({default: "No description"})
    description:string;

    @Prop({default: 0})
    rating:number;

    @Prop({ required: true, default: 0 })
    stock:number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)