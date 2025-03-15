import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Advertisment } from 'src/advertisment/entities/advertisment.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel:Model<Order>,@InjectModel(User.name) private userModel:Model<User>,@InjectModel(Advertisment.name) private advertismentModel:Model<Advertisment>  ){}
  async create(createOrderDto: CreateOrderDto,user:any) {
    let {id}=user
    let created = await this.orderModel.create({...createOrderDto,id})
    await this.userModel.findByIdAndUpdate(createOrderDto.userId,{
      $push:{orders:{$each:[created._id]}}
    })
    await this.advertismentModel.findByIdAndUpdate(createOrderDto.advertismentId,{
      $push:{orders:{$each:[created._id]}}
    })
  }

  async findAll(query) {
    let take =Number(query.limit)||10
    let prev=query.offset?(Number(query.offset)-1)*take:0
    let ord= query.order||1
    let orderBy=query.orderBy||-1
    return await this.orderModel.find().skip(prev).limit(take).sort({[orderBy]:ord})
  }

  async findOne(id: string) {
    let find = await this.orderModel.findById(id)
    if(!find){
      return {message:"not found data with this id"}
    }
    return find
  }

}
