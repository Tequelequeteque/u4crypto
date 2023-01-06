import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomersEntity } from './customers.entity';
import { InvolvedsEntity } from './involveds.entity';
import { VehiclesEntity } from './vehicles.entity';

@Entity('accidents')
export class AccidentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => CustomersEntity, { eager: true, cascade: true })
    @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
    customer: CustomersEntity;

    @ManyToOne(() => VehiclesEntity, { eager: true, cascade: true })
    @JoinColumn({ name: 'vehichle_id', referencedColumnName: 'id' })
    vehicle: VehiclesEntity;

    @ManyToMany(() => InvolvedsEntity, { eager: true, nullable: true, cascade: true })
    @JoinTable({
        name: 'accidents_involveds',
        joinColumn: { name: 'accident_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'involved_id', referencedColumnName: 'id' },
    })
    involveds?: InvolvedsEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at?: Date;
}
