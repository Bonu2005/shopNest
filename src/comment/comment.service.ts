import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel:Model<Comment>){}
 async create(createCommentDto: CreateCommentDto,user:any) {
   let {id}=user
    let newComment= {...createCommentDto,user:id}
    let created = await this.commentModel.create(newComment)
    return created
  }

 async findAll(query) {
  let take =Number(query.limit)||10
  let prev=query.offset?(Number(query.offset)-1)*take:0
  let ord= query.order||1
  let orderBy=query.orderBy||-1
  return await this.commentModel.find().skip(prev).limit(take).sort({[orderBy]:ord})
  }

 async findOne(id: string) {
  let find = await this.commentModel.findById(id).populate('user')
  if(!find){
    return {message:"not found data with this id"}
  }
  return find
  }

 async update(id: string, updateCommentDto: UpdateCommentDto,user:any) {
  let find = await this.commentModel.findById(id).populate('user')
  if(!find){
    return {message:"not found data with this id"}
  }
  if(find.id!=user.id){
    return {message:"its not your comment"}
  }
  let updated = await this.commentModel.findByIdAndUpdate(id,updateCommentDto)
  return updated
  }

 async remove(id: string,user:any) {
  let find = await this.commentModel.findById(id)
  if(!find){
    return {message:"not found data with this id"}
  }
  if(find.id!=user.id){
    return {message:"its not your comment"}
  }
  let removed = await this.commentModel.findByIdAndDelete(id)
  return removed
  }
}
