import { Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../entity/auth/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {UserService} from "./user/user.service";
import {UserController} from "./user/user.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: 'your_secret_key',
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [AuthController, UserController],
    providers: [AuthService, UserService],
})
export class AuthModule {}