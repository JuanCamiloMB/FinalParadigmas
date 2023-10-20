import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import { ProductsService } from 'src/products/products.service';

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

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const document = await this.userModel.findById(id).exec();
      return document;
    } catch (error) {
      throw new Error(`Error finding document by id: ${error.message}`);
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

  async addToCart(userEmail: string, productId: ObjectId){
    const document = await this.findByEmail(userEmail)
    const cart:Array<any> = document.cart
    const index = cart.findIndex(pair => pair.productId === productId);
    console.log("cart: ",cart, " index: ",index)
    
    
    if(index === -1){
      cart.push({productId: productId, quantity: 1})
      console.log("here")
    } else{
      cart[index].quantity += 1;
    }
    console.log("cart: ",cart)
    
    
    await this.userModel.findById(document._id).then(
      (user)=>{
        user.cart = cart
        user.save()
        console.log("done")
      }
    )
    //const update = await this.userModel.updateOne({email: userEmail},{$set:{cart: cart}})
  }

  async deleteUser(userInfo){
    try{
      const res = await this.userModel.deleteOne({email: userInfo.email})
      console.log(res)
    } catch(error){
      throw new Error(
        `Error deleting by email ${userInfo.email}`
      )
    }
  }
}
