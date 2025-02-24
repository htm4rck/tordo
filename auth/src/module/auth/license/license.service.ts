import {HttpException, HttpStatus, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from '@entity/auth/license.entity';
import { LicenceCreateModel, LicenseUpdateModel } from '@model/auth/license.model';
import { User } from '@entity/auth/user.entity';
import {ApiResponse} from "@model/api-response.model";

@Injectable()
export class LicenseService {
    private readonly logger = new Logger(LicenseService.name);
    constructor(
        @InjectRepository(License)
        private readonly licenseRepository: Repository<License>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createLicense(createLicenseDto: LicenceCreateModel): Promise<License> {
        const user = await this.userRepository.findOne({where: {userCode: createLicenseDto.by}});
        if (!user) {
            this.logger.error(`Código de Usuario: ${createLicenseDto.by} no encontrado`);
            throw new HttpException(
                new ApiResponse({
                    success: false,
                    message: `Código de Usuario: ${createLicenseDto.by} no encontrado`,
                    errorCode: 'USER_NOT_FOUND',
                }),
                HttpStatus.NOT_FOUND,
            );
        }
        const license = this.licenseRepository.create({
            durationInDays:createLicenseDto.days,
            type: createLicenseDto.type,
            createdBy: createLicenseDto.by,
        });

        return this.licenseRepository.save(license);
    }

    // async getLicensesByUser(userId: number): Promise<License[]> {
    //     const user = await this.userRepository.findOne(userId, { relations: ['licenses'] });
    //     if (!user) {
    //         throw new NotFoundException(`User with ID ${userId} not found`);
    //     }
    //
    //     return user.licenses;
    // }
    //
    // async updateLicense(id: number, updateLicenseDto: UpdateLicenseDto): Promise<License> {
    //     const license = await this.licenseRepository.findOne(id);
    //     if (!license) {
    //         throw new NotFoundException(`License with ID ${id} not found`);
    //     }
    //
    //     Object.assign(license, updateLicenseDto);
    //     return this.licenseRepository.save(license);
    // }
    //
    // async deleteLicense(id: number): Promise<void> {
    //     const result = await this.licenseRepository.delete(id);
    //     if (result.affected === 0) {
    //         throw new NotFoundException(`License with ID ${id} not found`);
    //     }
    // }
}