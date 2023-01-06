import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomersEntity } from './customers.entity';

@Entity('vehicles')
export class VehiclesEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => CustomersEntity, (customer: CustomersEntity) => customer.vehicles, { eager: true })
    @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
    customer?: CustomersEntity;

    @Column()
    model: string;

    @Column({ unique: true, name: 'license_plate' })
    licensePlate: string;

    @Column()
    brand: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at?: Date;
}