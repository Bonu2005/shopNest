import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: 'nameUz is required' })
    nameUz:string;


    @IsString()
    @IsNotEmpty({ message: 'nameRu is required' })
    nameRu:string;


    @IsString()
    @IsNotEmpty({ message: 'image is required' })
    image:string;
}
