import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);

    const email = createUserDto.email;
    const password = createUserDto.password;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    return createdUser.save();
  }

  async signin(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //console.log(userCredential)
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const document = await this.userModel.findById(id).exec();
      return document;
    } catch (error) {
      throw new Error(`Error finding document: ${error.message}`);
    }
  }

  async findByName(propertyValue: string): Promise<User | null> {
    try {
      const document = await this.userModel
        .findOne({ name: propertyValue })
        .exec();
      return document;
    } catch (error) {
      throw new Error(
        `Error finding document by ${propertyValue}: ${error.message}`,
      );
    }
  }

  async findByEmail(propertyValue: string): Promise<User | null> {
    try {
      const document = await this.userModel
        .findOne({ email: propertyValue })
        .exec();
      return document;
    } catch (error) {
      throw new Error(
        `Error finding document by ${propertyValue}: ${error.message}`,
      );
    }
  }
}