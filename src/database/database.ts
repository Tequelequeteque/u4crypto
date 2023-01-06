import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AccidentsEntity } from '../entities/accidents.entity';
import { CustomersEntity } from '../entities/customers.entity';
import { InvolvedsEntity } from '../entities/involveds.entity';
import { VehiclesEntity } from '../entities/vehicles.entity';

export class Database {
    private static connection: DataSource;

    public static async getConnection(): Promise<DataSource> {
        if (!this.connection) {
            const isTest = process.env.NODE_ENV === 'test';
            this.connection = await new DataSource({
                type: 'postgres',
                host: isTest ? 'test' : 'db',
                port: 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [CustomersEntity, VehiclesEntity, AccidentsEntity, InvolvedsEntity],
                synchronize: true,
                dropSchema: isTest,
            }).initialize().then((connection) => {
                console.log('Connection to database established');
                return connection;
            }).catch((error) => {
                console.log('Error connecting to database');
                console.log(error);
                process.exit(1);
            });
        }
        return this.connection;
    }
}