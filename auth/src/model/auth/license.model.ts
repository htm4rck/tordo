import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';
import {LicenseType} from "@model/auth/auth.enum";

export class LicenceCreateModel {

    @IsString()
    by: string;

    @IsEnum(LicenseType, { message: 'type must be a valid enum value' })
    type: LicenseType;

    @IsNumber()
    days: number;
}

export class LicenseUpdateModel {
    @IsBoolean()
    isActive: boolean;

    @IsString()
    by: string;
}