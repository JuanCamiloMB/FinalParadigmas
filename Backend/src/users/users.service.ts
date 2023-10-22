import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Product } from 'src/products/product.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,@InjectModel(Product.name) private productModel: Model<Product>) {}

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

  async deleteUser(userInfo) {
    try {
      const res = await this.userModel.deleteOne({ email: userInfo.email });
      console.log(res);
    } catch (error) {
      throw new Error(`Error deleting by email ${userInfo.email}`);
    }
  }

  async addToCart(userEmail: string, productId: ObjectId) {
    const document = await this.findByEmail(userEmail);
    const cart: Array<any> = document.cart;
    const resultado = cart.findIndex((val) => {
      return val.productId.toString() === productId;
    });

    if (resultado === -1) {
      cart.push({ productId: productId, quantity: 1 });
    } else {
      cart[resultado].quantity += 1;
    }

    await this.userModel.findById(document._id).then((user) => {
      user.cart = cart;
      user.save();
    });
    const update = await this.userModel.updateOne(
      { email: userEmail },
      { $set: { cart: cart } },
    );
  }

  async getCart(userEmail: any) {
    const document = await this.findByEmail(userEmail);
    return document.cart;
  }

  async payCart(userEmail:any, uid:string, total:number){
    const document = await this.userModel.findOne({email: userEmail});
    const cart = document.cart;
    
    //Bank API here

    cart.forEach(async (element)=>{
      const doc = await this.productModel.findOne({_id: element.productId})
      doc.stock -= element.quantity
      await doc.save()
    })

    document.cart = []
    document.save()

    return "Done payment"
  }
}
