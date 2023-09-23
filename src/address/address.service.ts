import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {

  constructor(@InjectModel(Address.name) private addressModel: Model<Address>){}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto)
    return createdAddress.save();
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }

  async findOne(id: number): Promise<Address | null> {
    try{
      const document = await this.addressModel.findById(id).exec();
      return document;
    } catch (error){
      throw new Error(`Error finding document: ${error.message}`)
    }
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
