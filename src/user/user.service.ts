import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as  bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel:Model<User>,private jwtService:JwtService){}


  async registr(createUserDto: CreateUserDto) {
    let {email,password}=createUserDto
    let find = await this.userModel.findOne({email})
    if(find){
      return {message:"You registered already with this email"}
    }
    let hash = bcrypt.hashSync(password,10)
    let created = await this.userModel.create({...createUserDto,password:hash})
    let token  = this.jwtService.sign({id:created._id,type:created.type})
    return token
  }


  async login(loginUserDto: LoginUserDto) {
    let {email,password}=loginUserDto
    let find = await this.userModel.findOne({email})
    if(!find){
      return {message:"Not registered with this email"}
    }
    let check = bcrypt.compareSync(password,find.password)
    if(!check){
      return {message:"Wrong credentials"}
    }   let token  = this.jwtService.sign({id:find._id,type:find.type})
    return token

  }


 async findAll(query) {
  let take =Number(query.limit)||10
  let prev=query.offset?(Number(query.offset)-1)*take:0
  let ord= query.order||1
  let orderBy=query.orderBy||-1
  return await this.userModel.find().skip(prev).limit(take).sort({[orderBy]:ord})
  }


 async findOne(id: string) {
    let find = await this.userModel.findById(id)
    if(!find){
      return {mesage:"Not found data with this id"}
    }
   return find
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    let find = await this.userModel.findById(id)
    if(!find){
      return {mesage:"Not found data with this id"}
    }
    let updated = await this.userModel.findByIdAndUpdate(id,updateUserDto)
   return updated
  }


 async remove(id: string) {
    let find = await this.userModel.findById(id)
    if(!find){
      return {mesage:"Not found data with this id"}
    }
    let removed = await this.userModel.findByIdAndDelete(id)
   return removed
  }

  
}
