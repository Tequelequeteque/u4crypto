import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { VehiclesEntity } from './vehicles.entity';

@Entity('customers')
export class CustomersEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    cpf: string;

    @OneToMany(() => VehiclesEntity, (vehicle: VehiclesEntity) => vehicle.customer, { cascade: true })
    vehicles: VehiclesEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}