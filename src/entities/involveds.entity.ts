import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AccidentsEntity } from "./accidents.entity";

@Entity('involveds')
export class InvolvedsEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ unique: true })
    email: string;

    @ManyToMany(() => AccidentsEntity, { nullable: true, cascade: true })
    @JoinTable({
        name: 'accidents_involveds',
        joinColumn: { name: 'involved_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'accident_id', referencedColumnName: 'id' },
    })
    accident: AccidentsEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}