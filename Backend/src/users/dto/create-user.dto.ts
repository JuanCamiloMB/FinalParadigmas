import {IsEmail, IsNotEmpty, IsPhoneNumber, MinLength} from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(6)
    password:string;

    @IsNotEmpty()
    name: string;

    @IsPhoneNumber()
    phone:string;

    TwoFA:boolean;

    cart: [{}];

    defaultAddress?: any;
}
