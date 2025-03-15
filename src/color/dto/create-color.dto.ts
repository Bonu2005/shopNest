import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateColorDto {
    @ApiProperty({ example: "Qizil", description: "Название цвета на узбекском" })
    @IsString()
    @IsNotEmpty({ message: 'nameUz is required' })
    nameUz: string;

    @ApiProperty({ example: "Красный", description: "Название цвета на русском" })
    @IsString()
    @IsNotEmpty({ message: 'nameRu is required' })
    nameRu: string;
}
