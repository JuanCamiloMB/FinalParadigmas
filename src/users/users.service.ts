import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  private readonly Users: CreateUserDto[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: number): Promise<User | null> {
    try{
      const document = await this.userModel.findById(id).exec();
      return document;
    } catch (error){
      throw new Error(`Error finding document: ${error.message}`)
    }
  }

  async findByName(propertyValue: string): Promise<User | null>{
    try{
      const document = await this.userModel.findOne({ name: propertyValue}).exec();
      return document;
    }catch(error){
      throw new Error(`Error finding document by ${propertyValue}: ${error.message}`);
    }
  }

  async findByEmail(propertyValue: string): Promise<User | null>{
    try{
      const document = await this.userModel.findOne({email: propertyValue}).exec();
      return document;
    }catch(error){
      throw new Error(`Error finding document by ${propertyValue}: ${error.message}`);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
