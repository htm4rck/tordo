import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UserModel {

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    nif: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 100)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    lastName: string;

    @IsOptional()
    @IsString()
    @Length(10, 15)
    phoneNumber: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsBoolean()
    isActive: boolean;

    @IsBoolean()
    isVerified: boolean;

    @IsOptional()
    @IsDate()
    lastLogin: Date;

    @IsOptional()
    @IsDate()
    at: Date;

    @IsOptional()
    @IsString()
    by: string;


    constructor(partial: Partial<UserModel>) {
        Object.assign(this, partial);
    }
}

export class UserLoginModel {
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    @IsString({ message: 'El usuario debe ser una cadena de texto' })
    user: string;

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    pass: string;

    // @IsNotEmpty({ message: 'La firma no puede estar vacía' })
    // @IsString({ message: 'La firma debe ser una cadena de texto' })
    // signature: string;
}

export class UserSessionModel {
    token: string;
}