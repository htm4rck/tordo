import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../../../entity/auth/user.entity';
import {UserLoginModel, UserSessionModel} from '../../../model/auth/user.model';
import {ApiResponse} from '../../../model/api-response.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async login(userLoginModel: UserLoginModel): Promise<ApiResponse<UserSessionModel>> {
        const user = await this.userRepository.findOne({
            where: {userCode: userLoginModel.user},
        });

        if (!user) {
            console.log(123)
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: 'Usuario o clave incorrectos1',
                    errorCode: 'LOGIN_ERROR',
                }),
                HttpStatus.UNAUTHORIZED,
            );
        }

        if (!userLoginModel.pass) {
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: 'Usuario o clave incorrectos2',
                    errorCode: 'LOGIN_ERROR',
                }),
                HttpStatus.UNAUTHORIZED,
            );
        }
        console.log(userLoginModel);
        console.log(user.password);
        const isPasswordValid = await bcrypt.compare(userLoginModel.pass, user.password);
        if (!isPasswordValid) {
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: 'Usuario o clave incorrectos3',
                    errorCode: 'LOGIN_ERROR',
                }),
                HttpStatus.UNAUTHORIZED,
            );
        }
        // const token = '12345'; // Ejemplo de token

        const payload = { username: user.username, sub: user.userCode };
        const token = this.jwtService.sign(payload);

        return new ApiResponse({
            success: true,
            data: {token: token},
            message: 'Inicio de sesión exitoso',
        });
    }
}