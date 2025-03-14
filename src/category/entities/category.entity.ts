import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Advertisment } from "src/advertisment/entities/advertisment.entity";
export type CategoryDocument = HydratedDocument<Category>
@Schema()
export class Category {
    @Prop({required:true})
    nameUz:string

    @Prop({required:true})
    nameRu:string

    @Prop({required:true})
    image:string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Advertisment" }] }) 
    advertisment: Advertisment[]
}

 export let CategorySchema = SchemaFactory.createForClass(Category)