import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, PrimaryColumn,
} from 'typeorm';
import { UserRolCompany } from './user_rol_company.entity';
import { Session } from './session.entity';

@Entity()
export class User {
    @PrimaryColumn({comment:'Concatenar(U+nif)'})
    userCode: string;

    @Column({ unique: true })
    nif: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    lastLogin: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;

    @OneToMany(() => UserRolCompany, userRolCompany => userRolCompany.userCode)
    userRolCompanies: UserRolCompany[];

    @OneToMany(() => Session, session => session.userCode)
    sessions: Session[];
}