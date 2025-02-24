import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    ValidationPipe,
    ParseIntPipe,
    HttpStatus, HttpException, HttpCode
} from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenceCreateModel, LicenseUpdateModel } from '@model/auth/license.model';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ApiResponse } from '@model/api-response.model';
import {License} from "@entity/auth/license.entity";

@Controller('license')
export class LicenseController {
    constructor(private readonly licenseService: LicenseService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async createLicense(
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
        })) createLicenseDto: LicenceCreateModel,
    ): Promise<ApiResponse<License>> {
        const license = await this.licenseService.createLicense(createLicenseDto);
        return new ApiResponse({ success: true, data: license, message: 'Licencia creada exitosamente' });
    }
//
//     @UseGuards(JwtAuthGuard)
//     @Get(':userId')
//     async getLicensesByUser(
//         @Param('userId', ParseIntPipe) userId: number,
//     ): Promise<ApiResponse<License[]>> {
//         const licenses = await this.licenseService.getLicensesByUser(userId);
//         return new ApiResponse({ success: true, data: licenses, message: 'Licencias obtenidas exitosamente' });
//     }
//
//     @UseGuards(JwtAuthGuard)
//     @Put(':id')
//     async updateLicense(
//         @Param('id', ParseIntPipe) id: number,
//         @Body(new ValidationPipe({
//             whitelist: true,
//             exceptionFactory: (errors) => {
//                 const messages = errors.map((error: any) => Object.values(error.constraints)).flat();
//                 return new HttpException({
//                     success: false,
//                     message: 'Error en la validación',
//                     errorCode: 'VALIDATION_ERROR',
//                     errorDetails: messages
//                 }, HttpStatus.BAD_REQUEST);
//             }
//         })) updateLicenseDto: LicenseUpdateModel,
//     ): Promise<ApiResponse<License>> {
//         const license = await this.licenseService.updateLicense(id, updateLicenseDto);
//         return new ApiResponse({ success: true, data: license, message: 'Licencia actualizada exitosamente' });
//     }
//
//     @UseGuards(JwtAuthGuard)
//     @Delete(':id')
//     async deleteLicense(
//         @Param('id', ParseIntPipe) id: number,
//     ): Promise<ApiResponse<null>> {
//         await this.licenseService.deleteLicense(id);
//         return new ApiResponse({ success: true, message: 'Licencia eliminada exitosamente' });
//     }
 }