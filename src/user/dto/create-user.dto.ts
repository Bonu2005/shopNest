import { IsEmail, IsEnum, IsMobilePhone,IsMongoId, IsNotEmpty,  IsString, IsStrongPassword } from "class-validator"
import { UserType } from "src/types/typeAll"

export class CreateUserDto {
        @IsString()
        @IsNotEmpty({ message: 'name is required' })
        name:string
    
        @IsEmail({}, { message: "Invalid email format" })
        @IsNotEmpty({ message: 'email is required' })
        email:string
        
        @IsStrongPassword()
        @IsNotEmpty({ message: 'password is required' })
        password:string
        
        @IsString()
        // @IsNotEmpty({ message: 'shopName is required' })
        shopName:string
    
        @IsMobilePhone('uz-UZ')
        @IsNotEmpty({ message: 'phone is required' })
        phone:string
    
        @IsMongoId({ message: "Invalid region ID" })
        // @IsNotEmpty({ message: 'regionId is required' })
        region:string
    
        @IsString()
        // @IsNotEmpty({ message: 'location is required' })
        location:string
    
        @IsString()
        // @IsNotEmpty({ message: 'photo is required' })
        photo:string
    
        @IsEnum(UserType, { message: "Type must be CLIENT, SELLER, or ADMIN" })
        @IsNotEmpty({ message: 'type is required' })
        type:UserType
}

export class LoginUserDto{
        @IsEmail({}, { message: "Invalid email format" })
        @IsNotEmpty({ message: 'email is required' })
        email:string
        
        @IsStrongPassword()
        @IsNotEmpty({ message: 'password is required' })
        password:string
        
}