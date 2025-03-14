import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';
import { Model } from 'mongoose';
import { request } from 'express';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private regionModel: Model<Region>) {}


  async create(createRegionDto: CreateRegionDto) {
    let created = await this.regionModel.create(createRegionDto)
    return created
  }

  async findAll() {
    let find = await this.regionModel.find()
    return find
  }

  async findOne(id: string) {
    let find = await this.regionModel.findById(id)
    if (!find) {
      return { message: "Not found data with this id" }
    }
    return find
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    let find = await this.regionModel.find()
    if (!find) {
      return { message: "Not found data with this id" }
    }
    let updated = await this.regionModel.findByIdAndUpdate(id, updateRegionDto)
    return updated

  }
  async remove(id: string) {
    let find = await this.regionModel.find()
    if (!find) {
      return { message: "Not found data with this id" }
    }
    let removed = await this.regionModel.findByIdAndDelete(id)
    return removed

  }
}