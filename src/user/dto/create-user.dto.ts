import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsOptional()
    id: number

    @IsString()
    @MaxLength(200)
    name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username: string

    @IsString()
    @MinLength(4)
    password: string
}
