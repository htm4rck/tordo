import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, PrimaryGeneratedColumn, BeforeInsert,
} from 'typeorm';
import {generateLicenseKey} from "../entities.utils";
import {LicenseType} from "@model/auth/auth.enum";

@Entity()
export class License {
    @PrimaryGeneratedColumn('uuid', { comment: "Identificador único de la licencia" })
    licenseCode: string;

    @Column({ comment: "Clave de la licencia (serial key)" })
    licenseKey: string;

    @BeforeInsert()
    generateLicenseKey() {
        this.licenseKey = generateLicenseKey();
    }

    @Column({ type: 'enum', enum: LicenseType, comment: "Tipo de licencia" })
    type: 'root' | 'professional' | 'applicative';

    @Column({ type: 'date', nullable: true, comment: "Fecha de expiración de la licencia" })
    expirationDate: Date;

    @Column({ comment: "Duración de la licencia en días" })
    durationInDays: number;

    @Column({ default: false, comment: "Indica si la licencia está activa" })
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