import { Injectable } from '@nestjs/common';
import { CreateAdvertismentDto } from './dto/create-advertisment.dto';
import { UpdateAdvertismentDto } from './dto/update-advertisment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Advertisment } from './entities/advertisment.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdvertismentService {
  constructor(@InjectModel(Advertisment.name) private advertismentModel:Model<Advertisment>){}
  async create(createAdvertismentDto: CreateAdvertismentDto,user:any) {
   let created = await this.advertismentModel.create(createAdvertismentDto)
   return created
  }

  async findAll(query) {
    let take =Number(query.limit)||10
    let prev=query.offset?(Number(query.offset)-1)*take:0
    let ord= query.order||1
    let orderBy=query.orderBy||-1
    return await this.advertismentModel.find().skip(prev).limit(take).sort({[orderBy]:ord})
  }

  async findOne(id: string) {
    let find = await this.advertismentModel.findById(id).populate('category').populate('color')
    if(!find){
      return {message:"Not found data with this id"}
    }
    return find
  }

 async update(id: string, updateAdvertismentDto: UpdateAdvertismentDto,user:any) {
    let find = await this.advertismentModel.find()
    if(!find){
      return {message:"Not found data with this id"}
    }
    let updated = await this.advertismentModel.findByIdAndUpdate(id,updateAdvertismentDto)
    return updated
  }

  async remove(id: string,user:any) {
    let find = await this.advertismentModel.find()
    if(!find){
      return {message:"Not found data with this id"}
    }
    let removed = await this.advertismentModel.findByIdAndDelete(id)
    return removed
  }
}
