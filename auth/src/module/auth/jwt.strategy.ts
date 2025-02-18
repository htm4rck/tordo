import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your_secret_key', // Debes cambiar esto a una clave secreta segura
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const signature = req.headers['x-signature'] as string;

        if (typeof token !== 'string' || typeof signature !== 'string') {
            throw new UnauthorizedException();
        }

        const isValidToken = await this.authService.validateToken(token, signature);
        if (!isValidToken) {
            throw new UnauthorizedException();
        }
        return { userId: payload.sub, username: payload.username };
    }
}