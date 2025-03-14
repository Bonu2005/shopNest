import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type CommentDocument = HydratedDocument<Comment>
@Schema()
export class Comment {
    @Prop()
    txt_message:string

    @Prop()
    star:number

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User",required:true})
    user:mongoose.Schema.Types.ObjectId 
}
export let CommentSchema= SchemaFactory.createForClass(Comment)