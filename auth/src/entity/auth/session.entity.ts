import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    signature: string;

    @ManyToOne(() => User, user => user.sessions)
    user: User;
}