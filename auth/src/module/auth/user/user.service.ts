import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../../../entity/auth/user.entity';
import {UserSessionModel, UserModel} from '../../../model/auth/user.model';
import {ApiResponse} from '../../../model/api-response.model';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async createUser(userModel: UserModel): Promise<ApiResponse<UserSessionModel>> {
        const hashedPassword = await bcrypt.hash(userModel.password, 10);
        userModel.password = hashedPassword;
        const userEntity: any = {
            userCode: 'U' + userModel.nif,
            username: userModel.username,
            nif: userModel.nif,
            lastName: userModel.lastName,
            firstName: userModel.firstName,
            password: hashedPassword,
            isActive: true,
            isVerified: true,
            createdAt: userModel.at,
            createdBy: userModel.by,
        }
        const newUser = this.userRepository.create(userEntity);
        await this.userRepository.save(newUser);
        return new ApiResponse({
            success: true,
            data: {token: 'user_created'},
            message: 'Usuario creado exitosamente',
        });
    }

    async updateUser(userCode: string, userModel: UserModel): Promise<ApiResponse<UserSessionModel>> {
        const user = await this.userRepository.findOne({where: {userCode}});
        if (!user) {
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: 'Usuario no encontrado',
                    errorCode: 'USER_NOT_FOUND',
                }),
                HttpStatus.NOT_FOUND,
            );
        }

        const hashedPassword = await bcrypt.hash(userModel.password, 10);
        userModel.password = hashedPassword;
        Object.assign(user, userModel);

        await this.userRepository.save(user);
        return new ApiResponse({
            success: true,
            data: {token: 'user_updated'},
            message: 'Usuario actualizado exitosamente',
        });
    }

    async deleteUser(userCode: string): Promise<ApiResponse<null>> {
        const user = await this.userRepository.findOne({where: {userCode}});
        if (!user) {
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: 'Usuario no encontrado',
                    errorCode: 'USER_NOT_FOUND',
                }),
                HttpStatus.NOT_FOUND,
            );
        }

        await this.userRepository.remove(user);
        return new ApiResponse({
            success: true,
            data: null,
            message: 'Usuario eliminado exitosamente',
        });
    }
}