import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Element {
    @PrimaryColumn({ comment: "Código único del objeto" })
    elementCode: string;

    @Column({ type: 'enum', enum: ['MENU', 'FORM', 'BUTTON', 'INPUT'], comment: "Tipo del objeto" })
    elementType: 'MENU' | 'FORM' | 'BUTTON' | 'INPUT';

    @Column({ comment: "Aplicación a la que pertenece el objeto" })
    app: string;

    @Column({ nullable: true, comment: "Menú al que pertenece el objeto (si aplica)" })
    menu: string;

    @Column({ nullable: true, comment: "Formulario al que pertenece el objeto (si aplica)" })
    form: string;

    @Column({ nullable: true, comment: "Botón o campo de entrada al que pertenece el objeto (si aplica)" })
    buttonOrInput: string;

    @CreateDateColumn({ comment: "Fecha de creación del objeto" })
    createdAt: Date;

    @UpdateDateColumn({ comment: "Fecha de última actualización del objeto" })
    updatedAt: Date;
}