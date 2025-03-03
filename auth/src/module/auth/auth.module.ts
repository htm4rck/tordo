import { Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "@entity/auth/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {Session} from "@entity/auth/session.entity";
import {UserController} from "./user/user.controller";
import {LicenseController} from "./license/license.controller";
import {UserService} from "./user/user.service";
import {LicenseService} from "./license/license.service";
import {License} from "@entity/auth/license.entity";
import {AuthLoaderService} from "./auth.loader";
import {Element} from "@entity/auth/element.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Session, License, Element]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your_secret_key', // Debes cambiar esto a una clave secreta segura
            //signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, JwtStrategy, UserService, LicenseService, AuthLoaderService],
    controllers: [AuthController, UserController, LicenseController],
})
export class AuthModule {}