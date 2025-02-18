import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Añade tu lógica de autorización aquí si es necesario
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // Puedes lanzar una excepción basada en algún error de info
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}