import { Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../entity/auth/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {Session} from "../../entity/auth/session.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Session]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your_secret_key', // Debes cambiar esto a una clave secreta segura
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}