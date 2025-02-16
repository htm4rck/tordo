import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '../../../model/api-response.model';
import { UserService } from './user.service';
import {UserLoginModel, UserModel, UserSessionModel} from '../../../model/auth/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createUser(
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
        })) userModel: UserModel,
    ): Promise<ApiResponse<UserSessionModel>> {
        try {
            const userSessionModelApiResponse = await this.userService.createUser(userModel);
            return new ApiResponse(userSessionModelApiResponse);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error al crear usuario',
                        errorCode: 'CREATE_ERROR',
                        errorDetails: error.message,
                    }),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            } else {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error desconocido al crear usuario',
                        errorCode: 'UNKNOWN_ERROR',
                    }),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    @Put(':userCode')
    @HttpCode(HttpStatus.OK)
    async updateUser(
        @Param('userCode') userCode: string,
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
        })) userModel: UserModel,
    ): Promise<ApiResponse<UserSessionModel>> {
        try {
            const userSessionModelApiResponse = await this.userService.updateUser(userCode, userModel);
            return new ApiResponse(userSessionModelApiResponse);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error al actualizar usuario',
                        errorCode: 'UPDATE_ERROR',
                        errorDetails: error.message,
                    }),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            } else {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error desconocido al actualizar usuario',
                        errorCode: 'UNKNOWN_ERROR',
                    }),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    @Delete(':userCode')
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('userCode') userCode: string): Promise<ApiResponse<null>> {
        try {
            const userSessionModelApiResponse = await this.userService.deleteUser(userCode);
            return new ApiResponse(userSessionModelApiResponse);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error al eliminar usuario',
                        errorCode: 'DELETE_ERROR',
                        errorDetails: error.message,
                    }),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            } else {
                throw new HttpException(
                    new ApiResponse({
                        success: false,
                        message: 'Error desconocido al eliminar usuario',
                        errorCode: 'UNKNOWN_ERROR',
                    }),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
}