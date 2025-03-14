import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Advertisment } from "src/advertisment/entities/advertisment.entity";
import { User } from "src/user/entities/user.entity";
export type OrderDocument = HydratedDocument<Order>
@Schema()
export class Order {
    @Prop({type:mongoose.Schema.Types.ObjectId ,ref:"User",required:true})
    user:mongoose.Schema.Types.ObjectId 

    @Prop({type:mongoose.Schema.Types.ObjectId ,ref:"Advertisment",required:true})
    advertisment:mongoose.Schema.Types.ObjectId 
}
export let OrderSchema = SchemaFactory.createForClass(Order)
OrderSchema.set("timestamps", true);