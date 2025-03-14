import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Advertisment } from "src/advertisment/entities/advertisment.entity";
export type ColorDocument = HydratedDocument<Color>
@Schema()
export class Color {
    @Prop({required:true})
    nameUz:string

    @Prop({required:true})
    nameRu:string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Advertisment" }] }) 
    color: Advertisment[];
}
export let ColorSchema=SchemaFactory.createForClass(Color)