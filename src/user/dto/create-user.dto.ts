import { 
        IsEmail, 
        IsEnum, 
        IsMobilePhone, 
        IsMongoId, 
        IsNotEmpty,  
        IsString, 
        IsStrongPassword, 
        IsOptional 
    } from "class-validator";
    import { UserType } from "src/types/typeAll";
    
    export class CreateUserDto {
        @IsString()
        @IsNotEmpty({ message: 'Name is required' })
        name: string;
    
        @IsEmail({}, { message: "Invalid email format" })
        @IsNotEmpty({ message: 'Email is required' })
        email: string;
    
        @IsStrongPassword(
            { minLength: 6, minNumbers: 1, minUppercase: 1, minLowercase: 1, minSymbols: 0 },
            { message: 'Password must be at least 6 characters long and include at least 1 number and 1 uppercase letter' }
        )
        @IsNotEmpty({ message: 'Password is required' })
        password: string;
    
        @IsString()
        @IsOptional()
        shopName?: string;
    
        @IsMobilePhone('uz-UZ', {}, { message: 'Invalid phone number' })
        @IsNotEmpty({ message: 'Phone is required' })
        phone: string;
    
        @IsMongoId({ message: "Invalid region ID" })
        @IsOptional()
        region?: string;
    
        @IsString()
        @IsOptional()
        location?: string;
    
        @IsString()
        @IsOptional()
        photo?: string;
    
        @IsEnum(UserType, { message: "Type must be CLIENT, SELLER, or ADMIN" })
        @IsNotEmpty({ message: 'User type is required' })
        type: UserType;
    }
    
    export class LoginUserDto {
        @IsEmail({}, { message: "Invalid email format" })
        @IsNotEmpty({ message: 'Email is required' })
        email: string;
    
        @IsString()
        @IsNotEmpty({ message: 'Password is required' })
        password: string;
    }
    