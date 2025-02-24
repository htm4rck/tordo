import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {User} from "@entity/auth/user.entity";
import {Session} from "@entity/auth/session.entity";
import {ApiResponse} from "@model/api-response.model";
import {UserLoginModel, UserSessionModel} from "@model/auth/user.model";

@Injectable()
export class AuthService {
    private readonly ONE_HOUR = 3600 * 1000;
    private readonly expiresAt = new Date(Date.now() + (this.ONE_HOUR * 2));

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        private readonly jwtService: JwtService,
    ) {}

    async login(userLoginModel: UserLoginModel, signature: string): Promise<ApiResponse<UserSessionModel>> {
        const user = await this.userRepository.findOne({
            where: { userCode: userLoginModel.user },
        });

        if (!user) {
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: 'Usuario o clave incorrectos',
                    errorCode: 'LOGIN_ERROR',
                }),
                HttpStatus.UNAUTHORIZED,
            );
        }

        const isPasswordValid = await bcrypt.compare(userLoginModel.pass, user.password);
        if (!isPasswordValid) {
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: 'Usuario o clave incorrectos',
                    errorCode: 'LOGIN_ERROR',
                }),
                HttpStatus.UNAUTHORIZED,
            );
        }

        const payload = { username: user.username, sub: user.userCode };
        const token = this.jwtService.sign(payload);

        const session = this.sessionRepository.create({
            token,
            expiresAt: this.expiresAt,
            user,
            signature,
        });
        await this.sessionRepository.save(session);

        return new ApiResponse({
            success: true,
            data: { token: token },
            message: 'Inicio de sesión exitoso',
        });
    }
    async validateToken(token: string, signature: string): Promise<boolean> {
        try {
            const session = await this.sessionRepository.findOne({ where: { token } });
            if (!session || session.expiresAt < new Date() || session.signature !== signature) {
                return false;
            }
            const newExpiresAt = new Date(Date.now() + this.ONE_HOUR * 2);
            if (session.expiresAt < newExpiresAt) {
                session.expiresAt = newExpiresAt;
                await this.sessionRepository.save(session);
            }
            return true;
        } catch (error) {
            console.error('Error al validar el token:', error);
            return false;
        }
    }
}