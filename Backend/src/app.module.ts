import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot(), MongooseModule.forRoot(`${process.env.MONGODB_URI}`), UsersModule, ProductsModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
