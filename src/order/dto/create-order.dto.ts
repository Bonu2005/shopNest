import { IsMongoId, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({ example: "65f3a9d4e3b2c8a1d2e5f6a7", description: "ID пользователя, который делает заказ" })
    @IsMongoId()
    @IsNotEmpty({ message: "userId is required" })
    userId: string;

    @ApiProperty({ example: "65d2c8a1e3b2f6a7d4e5f3a9", description: "ID объявления, которое заказывают" })
    @IsMongoId()
    @IsNotEmpty({ message: "advertismentId is required" })
    advertismentId: string;
}
