import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ example: "Elektronika", description: "Название категории на узбекском языке" })
    @IsString()
    @IsNotEmpty({ message: 'nameUz is required' })
    nameUz: string;

    @ApiProperty({ example: "Электроника", description: "Название категории на русском языке" })
    @IsString()
    @IsNotEmpty({ message: 'nameRu is required' })
    nameRu: string;

    @ApiProperty({ example: "https://example.com/image.jpg", description: "Ссылка на изображение категории" })
    @IsString()
    @IsNotEmpty({ message: 'image is required' })
    image: string;
}
