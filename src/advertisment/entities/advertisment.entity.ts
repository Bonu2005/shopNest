import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"
import { Category } from "src/category/entities/category.entity"
import { Color } from "src/color/entities/color.entity"
export type AdvertismentDocument = HydratedDocument<Advertisment>
@Schema()
export class Advertisment {
       @Prop()
        name:string
    
        @Prop()
        price:string
        
        @Prop()
        discount:string
    
        @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Color"})
        color:mongoose.Schema.Types.ObjectId 
    
        @Prop()
        guarantie:string
    
        @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Category"})
        category:mongoose.Schema.Types.ObjectId 
    
        @Prop()
        type:string
    
  
}
export let AdvertismentSchema = SchemaFactory.createForClass(Advertisment)