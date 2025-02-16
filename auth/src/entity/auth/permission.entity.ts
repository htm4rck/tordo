import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Element } from './element.entity';
import { Role } from './role.entity';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Element)
    @JoinColumn({ name: 'elementCode' })
    objectCode: Element;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'roleCode' })
    rolCode: Role;
}