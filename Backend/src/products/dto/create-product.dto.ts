import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    price:string;

    description:string;

    rating?:number;

    stock:number;
}
