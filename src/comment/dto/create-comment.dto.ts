import { IsMongoId, IsNumber, IsString, Min, Max, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({ example: "Отличный продукт!", description: "Текст комментария" })
    @IsString()
    @IsNotEmpty({ message: "Comment text is required" })
    txt_message: string;

    @ApiProperty({ example: 5, description: "Рейтинг (от 1 до 5)" })
    @IsNumber()
    @Min(1, { message: "Star rating must be at least 1" })
    @Max(5, { message: "Star rating cannot exceed 5" })
    @IsNotEmpty({ message: "Star rating is required" })
    star: number;
}

