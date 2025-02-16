import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn, PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Session {
    @PrimaryColumn({ comment: "Código único del objeto; Token de la sesión" })
    token: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userCode' })
    userCode: User;

    @CreateDateColumn({ comment: "Fecha de inicio de la sesión" })
    createdAt: Date;

    @UpdateDateColumn({ comment: "Fecha de última actualización de la sesión" })
    updatedAt: Date;

    @Column({ type: 'date', comment: "Fecha de expiración de la sesión" })
    expirationDate: Date;
}