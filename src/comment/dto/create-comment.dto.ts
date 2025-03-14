import { IsMongoId, IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
        @IsString()
        txt_message:string
    
        @IsNumber()
        star:number
    
        @IsMongoId()
        userId:string
}
