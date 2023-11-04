import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<Product>){}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto)
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    try{
      const document = await this.productModel.findById(id).exec();
      return document;
    } catch (error){
      throw new Error(`Error finding document: ${error.message}`)
    }
  }

  async update(productInfo: UpdateProductDto, id:string) {
    try{
      const document = await this.productModel.findById(id)
      if(document){
        document.name = productInfo.name
        document.description = productInfo.description
        document.price = productInfo.price
        document.rating = productInfo.rating
        document.stock = productInfo.stock
        document.save()
        return document
      } else{
        return "No product found"
      }
    }catch(error){
      console.log(error)
      return "Error"
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
