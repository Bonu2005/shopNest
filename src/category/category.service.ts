import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel:Model<Category>){}
 async create(createCategoryDto: CreateCategoryDto,user:any) {
   let create = await this.categoryModel.create(createCategoryDto)
   return create
  }

  async findAll(query) {
    const filter: any = {};
 
    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' }; 
    }
  
    let find = await this.categoryModel
      .find(filter)
      .populate('advertisment')
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0)
      .sort(query.orderBy ? { [query.orderBy]: query.order === 'ASC' ? 1 : -1 } : {});
  
    return find;
  }

 async findOne(id: string) {
    let find = await this.categoryModel.findById(id).populate('advertisment')
    if(!find){
      return {message:"Not found data with this id"}
    }
    return find
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto,user:any) {
    let find = await this.categoryModel.findById(id)
    if(!find){
      return {message:"Not found data with this id"}
    }
    let updated = await this.categoryModel.findByIdAndUpdate(id,updateCategoryDto)
    return updated
  }

 async remove(id: string,user:any) {
    let find = await this.categoryModel.findById(id)
    if(!find){
      return {message:"Not found data with this id"}
    }
    let removed = await this.categoryModel.findByIdAndDelete(id)
    return removed
  }
}
