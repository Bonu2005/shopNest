import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';
import { Model } from 'mongoose';


@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private regionModel: Model<Region>) {}


  async create(createRegionDto: CreateRegionDto,user:any) {
    if(user.type!="ADMIN"){
      throw new UnauthorizedException()
    }
    let created = await this.regionModel.create(createRegionDto)
    return created
  }

  async findAll(query) {
    let take =Number(query.limit)||10
    let prev=query.offset?(Number(query.offset)-1)*take:0
    let ord= query.order||1
    let orderBy=query.orderBy||-1
    return await this.regionModel.find().skip(prev).limit(take).sort({[orderBy]:ord})
  }

  async findOne(id: string) {
    let find = await this.regionModel.findById(id).populate('users')
    if (!find) {
      return { message: "Not found data with this id" }
    }
    return find
  }

  async update(id: string, updateRegionDto: UpdateRegionDto,user:any) {
    if(user.type!="ADMIN"){
      throw new UnauthorizedException()
    }
    let find = await this.regionModel.find()
    if (!find) {
      return { message: "Not found data with this id" }
    }
    let updated = await this.regionModel.findByIdAndUpdate(id, updateRegionDto)
    return updated

  }
  async remove(id: string,user:any) {
    if(user.type!="ADMIN"){
      throw new UnauthorizedException()
    }
    let find = await this.regionModel.find()
    if (!find) {
      return { message: "Not found data with this id" }
    }
    let removed = await this.regionModel.findByIdAndDelete(id)
    return removed

  }
}