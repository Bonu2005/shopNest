import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel:Model<Category>){}
 async create(createCategoryDto: CreateCategoryDto) {
   let create = await this.categoryModel.create(createCategoryDto)
   return create
  }

  async findAll() {
    let find = await this.categoryModel.find()
    return find
  }

 async findOne(id: string) {
    let find = await this.categoryModel.findById(id)
    if(!find){
      return {message:"Not found data with this id"}
    }
    return find
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let find = await this.categoryModel.findById(id)
    if(!find){
      return {message:"Not found data with this id"}
    }
    let updated = await this.categoryModel.findByIdAndUpdate(id,updateCategoryDto)
    return updated
  }

 async remove(id: string) {
    let find = await this.categoryModel.findById(id)
    if(!find){
      return {message:"Not found data with this id"}
    }
    let removed = await this.categoryModel.findByIdAndDelete(id)
    return removed
  }
}
