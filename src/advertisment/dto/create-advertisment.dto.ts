import { Transform } from "class-transformer";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AdvertisementType } from "src/types/typeAll";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdvertismentDto {
    @ApiProperty({ example: "iPhone 15 Pro", description: "Name of the advertisement" })
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @ApiProperty({ example: 999.99, description: "Price of the product" })
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty({ message: "Price is required" })
    price: number;

    @ApiProperty({ example: 10, description: "Discount percentage" })
    @IsNumber()
    @Transform(({ value }) => parseFloat(value)) 
    @IsNotEmpty({ message: "Discount is required" })
    discount: number;

    @ApiProperty({ example: "60c72b2f9b1e8e1a7c4a2f1b", description: "Color ID (MongoDB ObjectId)" })
    @IsMongoId({ message: "Invalid color ID" })
    @IsNotEmpty({ message: "Color ID is required" })
    colorId: string;

    @ApiProperty({ example: "2 years", description: "Guarantee period" })
    @IsString()
    @IsNotEmpty({ message: "Guarantee is required" })
    guarantie: string;

    @ApiProperty({ example: "60c72b2f9b1e8e1a7c4a2f2c", description: "Category ID (MongoDB ObjectId)" })
    @IsMongoId({ message: "Invalid category ID" })
    @IsNotEmpty({ message: "Category ID is required" })
    categoryId: string;

    @ApiProperty({ example: "NOW", enum: AdvertisementType, description: "Type of advertisement" })
    @IsEnum(AdvertisementType, { message: "Type must be NOW or OLD" })
    @IsNotEmpty({ message: "Type is required" })
    type: AdvertisementType;
}
