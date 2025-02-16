import {IsNotEmpty, IsString, Length} from 'class-validator';

export class UserModel {
    @IsNotEmpty()
    @IsString()
    @Length(8, 11)
    document: string;

    @IsNotEmpty()
    @IsString()
    user: string;

    @IsString()
    pass?: string;

}

export class UserLoginModel {
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    @IsString({ message: 'El usuario debe ser una cadena de texto' })
    user: string;

    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    pass?: string;
}

export class UserSessionModel {
    token: string;
}