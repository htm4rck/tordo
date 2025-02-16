import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity()
export class License {
    @PrimaryColumn({ type: 'uuid', comment: "Identificador único de la licencia" })
    licenseCode: string;

    @Column({ comment: "Clave de la licencia (serial key)" })
    licenseKey: string;

    @Column({ type: 'enum', enum: ['root', 'professional', 'applicative'], comment: "Tipo de licencia" })
    type: 'root' | 'professional' | 'applicative';

    @Column({ type: 'date', nullable: true, comment: "Fecha de expiración de la licencia" })
    expirationDate: Date;

    @Column({ comment: "Duración de la licencia en días" })
    durationInDays: number;

    @Column({ default: true, comment: "Indica si la licencia está activa" })
    isActive: boolean;

    @CreateDateColumn({ comment: "Fecha de creación de la licencia" })
    createdAt: Date;

    @UpdateDateColumn({ comment: "Fecha de última actualización de la licencia" })
    updatedAt: Date;

    @DeleteDateColumn({ comment: "Fecha de eliminación de la licencia (soft delete)" })
    deletedAt: Date;

    @Column({ nullable: true, comment: "Usuario que creó la licencia" })
    createdBy: string;

    @Column({ nullable: true, comment: "Usuario que actualizó la licencia" })
    updatedBy: string;

    @Column({ nullable: true, comment: "Usuario que eliminó la licencia" })
    deletedBy: string;
}