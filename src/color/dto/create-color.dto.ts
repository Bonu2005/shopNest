import { IsNotEmpty, IsString } from "class-validator"

export class CreateColorDto {
    @IsString()
    @IsNotEmpty({ message: 'nameUz is required' })
    nameUz:string

    @IsString()
    @IsNotEmpty({ message: 'nameRu is required' })
    nameRu:string
}
