import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    roleCode: string;

    @Column({ comment: "Nombre del rol" })
    name: string;

    @Column({ nullable: true, comment: "Rol padre (si aplica)" })
    parentRol: string;

    @OneToMany(() => Permission, permission => permission.rolCode)
    permissions: Permission[];
}