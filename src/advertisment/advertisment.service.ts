import { Injectable } from '@nestjs/common';
import { CreateAdvertismentDto } from './dto/create-advertisment.dto';
import { UpdateAdvertismentDto } from './dto/update-advertisment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Advertisment } from './entities/advertisment.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdvertismentService {
  constructor(@InjectModel(Advertisment.name) private advertismentModel:Model<Advertisment>){}
  async create(createAdvertismentDto: CreateAdvertismentDto) {
   let created = await this.advertismentModel.create(createAdvertismentDto)
   return created
  }

  async findAll() {
    let find = await this.advertismentModel.find()
    return find
  }

  async findOne(id: string) {
    let find = await this.advertismentModel.findById(id)
    if(!find){
      return {message:"Not found data with this id"}
    }
    return find
  }

 async update(id: string, updateAdvertismentDto: UpdateAdvertismentDto) {
    let find = await this.advertismentModel.find()
    if(!find){
      return {message:"Not found data with this id"}
    }
    let updated = await this.advertismentModel.findByIdAndUpdate(id,updateAdvertismentDto)
    return updated
  }

  async remove(id: string) {
    let find = await this.advertismentModel.find()
    if(!find){
      return {message:"Not found data with this id"}
    }
    let removed = await this.advertismentModel.findByIdAndDelete(id)
    return removed
  }
}
