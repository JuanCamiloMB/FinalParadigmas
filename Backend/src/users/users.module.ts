import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { ProductsModule } from '../products/products.module';
import { Product, ProductSchema } from 'src/products/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), ProductsModule,MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
