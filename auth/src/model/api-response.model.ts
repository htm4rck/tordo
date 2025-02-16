import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
    @ApiProperty({ description: 'Indica si la solicitud fue exitosa' })
    success: boolean;

    @ApiProperty({ description: 'Datos devueltos por la solicitud', required: false })
    data?: T;

    @ApiProperty({ description: 'Mensaje adicional sobre la solicitud', required: false })
    message?: string;

    @ApiProperty({ description: 'Código de error, si aplica', required: false })
    errorCode?: string;

    @ApiProperty({ description: 'Detalles adicionales del error, si aplica', required: false })
    errorDetails?: any;

    constructor(partial: Partial<ApiResponse<T>>) {
        Object.assign(this, partial);
    }
}