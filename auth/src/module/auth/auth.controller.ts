import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '../../model/api-response.model';
import { AuthService } from './auth.service';
import {UserLoginModel, UserSessionModel} from '../../model/auth/user.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async login(
        @Body(new ValidationPipe({
            whitelist: true,
            exceptionFactory: (errors) => {
                const messages = errors.map((error: any) => Object.values(error.constraints)).flat();
                return new HttpException({
                    success: false,
                    message: 'Error en la validación',
                    errorCode: 'VALIDATION_ERROR',
                    errorDetails: messages
                }, HttpStatus.BAD_REQUEST);
            }
        })) userLogin: UserLoginModel,
    ): Promise<ApiResponse<UserSessionModel>> {
        try {
            const userSessionModelApiResponse = await this.authService.login(userLogin);
            return new ApiResponse(userSessionModelApiResponse);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error al iniciar sesión',
                        errorCode: 'LOGIN_ERROR',
                        errorDetails: error.message,
                    }),
                    HttpStatus.UNAUTHORIZED,
                );
            } else {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error desconocido al iniciar sesión',
                        errorCode: 'UNKNOWN_ERROR',
                    }),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
}