import { Repository, ObjectLiteral } from 'typeorm';

export class LoaderModel<T extends ObjectLiteral> {
    path: string;
    entity: new () => T;
    repository: Repository<T>;
    headers: string[];
    code: keyof T;

    constructor(path: string, entity: new () => T, repository: Repository<T>, headers: string[], code: keyof T) {
        this.path = path;
        this.entity = entity;
        this.repository = repository;
        this.headers = headers;
        this.code = code;
    }
}