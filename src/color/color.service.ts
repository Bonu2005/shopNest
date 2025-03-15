import { Injectable, Query } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Color } from './entities/color.entity';
import { Model } from 'mongoose';
import { TOrder, TOrderBy } from 'src/types/typeAll';

@Injectable()
export class ColorService {
  constructor(@InjectModel(Color.name) private colorModel:Model<Color>){}
  async create(createColorDto: CreateColorDto,user:any) {
    let created = await this.colorModel.create(createColorDto)
    return created
  }

 async findAll(query) {
    let find= await this.colorModel.find().populate('advertisment')
    return find
  }

 async findOne(id: string) {
      let find = await this.colorModel.findById(id).populate('advertisment')
      if(!find){
        return {message:"not found data with this id"}
      }
      return find
  }

  async update(id: string, updateColorDto: UpdateColorDto,user:any) {
    let find = await this.colorModel.findById(id)
    if(!find){
      return {message:"not found data with this id"}
    }
    let updated = await this.colorModel.findByIdAndUpdate(id,updateColorDto)
    return updated
  }

 async remove(id: string,user:any) {
    let find = await this.colorModel.findById(id)
    if(!find){
      return {message:"not found data with this id"}
    }
   let removed = await this.colorModel.findByIdAndDelete(id)
   return removed
  }
}
