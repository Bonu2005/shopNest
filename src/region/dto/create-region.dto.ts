import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
    @ApiProperty({ example: 'Toshkent', description: 'Region name in Uzbek' })
    @IsString()
    @IsNotEmpty({ message: 'nameUz is required' })
    nameUz: string;

    @ApiProperty({ example: 'Ташкент', description: 'Region name in Russian' })
    @IsString()
    @IsNotEmpty({ message: 'nameRu is required' })
    nameRu: string;
}
