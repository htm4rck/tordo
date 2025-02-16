import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { License } from './license.entity';
import { User } from './user.entity';

@Entity()
export class UserRolCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: "Código de la compañía" })
    companyCode: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userCode' })
    userCode: User;

    @ManyToOne(() => License)
    @JoinColumn({ name: 'licenseCode' })
    licenseCode: License;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'roleCode' })
    roleCode: Role;
}