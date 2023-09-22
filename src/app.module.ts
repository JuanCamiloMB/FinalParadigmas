import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ecommerce:wprnVAFbwUBJmUDc@cluster0.py32bi4.mongodb.net/?retryWrites=true&w=majority'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
