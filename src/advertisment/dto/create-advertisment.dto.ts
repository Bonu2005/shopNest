import { Transform } from "class-transformer";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { AdvertisementType } from "src/types/typeAll"

export class CreateAdvertismentDto {
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty({ message: "Price is required" })
    price: number;

    @IsNumber()
    @Transform(({ value }) => parseFloat(value)) 
    @IsNotEmpty({ message: "Discount is required" })
    discount: number;

    @IsMongoId({ message: "Invalid color ID" })
    @IsNotEmpty({ message: "Color ID is required" })
    colorId: string;

    @IsString()
    @IsNotEmpty({ message: "Guarantee is required" })
    guarantie: string;

    @IsMongoId({ message: "Invalid category ID" })
    @IsNotEmpty({ message: "Category ID is required" })
    categoryId: string;

    @IsEnum(AdvertisementType, { message: "Type must be NOW or OLD" })
    @IsNotEmpty({ message: "Type is required" })
    type: AdvertisementType;
        
}
