import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Order } from "src/order/entities/order.entity";
export type UserDocument = HydratedDocument<User>
@Schema()
export class User {
    @Prop({required:true})
    name:string

    @Prop({required:true})
    email:string
    
    @Prop({required:true})
    password:string

    @Prop({required:true})
    shopName:string

    @Prop({required:true})
    phone:string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Region",required:true})
    region:mongoose.Schema.Types.ObjectId 

    @Prop({required:true})
    location:string

    @Prop({required:true})
    photo:string

    @Prop({required:true})
    type:string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" ,}] })
    orders: mongoose.Schema.Types.ObjectId[];

    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] })
    comments: mongoose.Schema.Types.ObjectId[];
}

export let UserSchema = SchemaFactory.createForClass(User)