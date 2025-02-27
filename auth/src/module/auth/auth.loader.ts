import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, ObjectLiteral } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';
import { LoaderModel } from '@model/loader.model';
import { Element } from '@entity/auth/element.entity';

@Injectable()
export class AuthLoaderService implements OnApplicationBootstrap {
    private readonly logger = new Logger(AuthLoaderService.name);
    private readonly BATCH_SIZE = 500;

    constructor(
        @InjectRepository(Element)
        private readonly elementRepository: Repository<Element>,
    ) {}

    async onApplicationBootstrap() {
        const filePath = path.join(__dirname, '../../assets/data/element.csv');
        this.logger.log(filePath);
        this.logger.log('#################################');
        const loaderElement = new LoaderModel<Element>(
            filePath,
            Element,
            this.elementRepository,
            ['elementCode','elementType','app','menu','form','buttonOrInput','description'],
            'elementCode' as keyof Element
        );
        await this.procesar(loaderElement);
    }

    private async procesar<T extends ObjectLiteral>(loader: LoaderModel<T>) {
        if (!fs.existsSync(loader.path)) {
            this.logger.warn(`CSV file not found: ${loader.path}`);
            return;
        }

        const t_array: T[] = [];
        const readStream = fs.createReadStream(loader.path);
        const parser = readStream.pipe(csvParser({
            separator: ';',
            headers: loader.headers,
            skipLines: 1
        }));

        for await (const row of parser) {
            const entity = loader.repository.create(row as unknown as T);
            t_array.push(entity);

            if (t_array.length >= this.BATCH_SIZE) {
                await this.saveBatch(t_array, loader);
                t_array.length = 0; // Clear the array
            }
        }
        if (t_array.length > 0) {
            await this.saveBatch(t_array, loader);
        }
        this.logger.log('Data loaded successfully from CSV.');
    }

    private async saveBatch<T extends ObjectLiteral>(arrayEntity: T[], loader: LoaderModel<T>) {
        const geoLocationIds = arrayEntity.map(entity => entity[loader.code] as any);
        const whereCondition = { [loader.code]: In(geoLocationIds) } as any;
        const objetosExistentes = await loader.repository.find({
            where: whereCondition,
            select: [loader.code]
        });

        const idsExistentes = new Set(objetosExistentes.map(gl => gl[loader.code]));
        const nuevos = arrayEntity.filter(gl => !idsExistentes.has(gl[loader.code]));

        this.logger.log(`Found ${objetosExistentes.length} existing objetos in this batch.`);
        this.logger.log(`Saved ${nuevos.length} new objetos in this batch.`);

        if (nuevos.length > 0) {
            await loader.repository.save(nuevos);
        }
    }
}