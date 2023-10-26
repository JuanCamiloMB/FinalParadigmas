import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userInfo } from 'os';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Post('/api/updateuser')
  updateUser(@Body() userInfo:UpdateUserDto){
    return this.usersService.updateUser(userInfo)
  }

  @Post('/api/addtocart')
  addToCart(@Body() req:any){
    return this.usersService.addToCart(req.email, req.productId);
  }

  @Post('/api/modifyquantity')
  modifyQuantity(@Body() req:any){
    return this.usersService.modifyQuantity(req.email, req.productId, req.quantity);
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
