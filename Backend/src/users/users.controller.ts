import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userInfo } from 'os';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.usersService.findByName(name);
  }

  @Get('/api/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Post('/api/addtocart')
  addToCart(@Body() req:any){
    return this.usersService.addToCart(req.email, req.productId);
  }

  @Post('/api/remfromcart')
  remfromcart(@Body() req:any){
    return this.usersService.remfromcart(req.email, req.productId);
  }

  @Post('/api/getcart')
  getCart(@Body() req:any){
    return this.usersService.getCart(req.email)
  }

  @Post('/api/paycart')
  payCart(@Body() req:any){
    return this.usersService.payCart(req.email, req.uid, req.total)
  }

  @Post('/delete')
  deleteById(@Body() userInfo: any){
    return this.usersService.deleteUser(userInfo);
  }
}
