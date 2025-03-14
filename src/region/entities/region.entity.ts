import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/entities/user.entity";
export type RegionDocument = HydratedDocument<Region>

@Schema()
export class Region {
    @Prop({ required: true })
    nameUz: string

    @Prop({ required: true })
    nameRu: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] }) 
    users: User[];
}
export let RegionSchema = SchemaFactory.createForClass(Region)