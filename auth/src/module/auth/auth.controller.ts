import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Headers, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiResponse} from "../../model/api-response.model";
import {UserLoginModel, UserSessionModel} from "../../model/auth/user.model";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
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
        })) userLoginDto: UserLoginModel,
        @Headers('x-signature') signature: string,
    ): Promise<ApiResponse<UserSessionModel>> {
        try {
            const userSessionModelApiResponse = await this.authService.login(userLoginDto, signature);
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