import {IsEmail, IsNotEmpty, IsPhoneNumber} from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    name: string;

    @IsPhoneNumber()
    phone:string;

    TwoFA:boolean;

    defaultAddress?: any;
}
