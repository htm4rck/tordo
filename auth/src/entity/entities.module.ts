import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import {License} from "./auth/license.entity";
import {Session} from "./auth/session.entity";
import {Role} from "./auth/role.entity";
import {Element} from "./auth/element.entity";
import {Permission} from "./auth/permission.entity";
import {UserRolCompany} from "./auth/user_rol_company.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Element, License, Permission, Role, Session, User, UserRolCompany])],
    exports: [TypeOrmModule],
})
export class EntitiesModule {}