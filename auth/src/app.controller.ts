import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return 'Servicio de autenticación 2025-02-27 1.9.0';
    }
}
