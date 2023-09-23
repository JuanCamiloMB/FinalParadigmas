import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  country: string;

  name: string;

  street_address: string;

  internal_addres: string;

  city: string;

  region: string;

  zip: number;

  phone: number;

  @IsNotEmpty()
  resident: any;
}
