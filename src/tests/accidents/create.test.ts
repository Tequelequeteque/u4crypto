import { Server as HapiServer } from '@hapi/hapi';
import { randomUUID } from 'crypto';
import { DataSource } from "typeorm";
import { Database } from '../../database/database';
import { AccidentsEntity } from '../../entities/accidents.entity';
import { CustomersEntity } from '../../entities/customers.entity';
import { InvolvedsEntity } from '../../entities/involveds.entity';
import { VehiclesEntity } from '../../entities/vehicles.entity';
import { loadServer } from '../../main';

describe('Create accident', () => {
    let db: DataSource;
    let server: HapiServer;
    let customer: CustomersEntity
    let vehicle: VehiclesEntity

    beforeAll(async () => {
        db = await Database.getConnection();
        server = (await loadServer()).getApp();
    });

    afterAll(async () => {
        server.events.on('stop', async () => {
            await db.destroy();
        });
        server.stop();
    });

    beforeEach(async () => {
        await db.getRepository(InvolvedsEntity).delete({});
        await db.getRepository(AccidentsEntity).delete({});
        await db.getRepository(VehiclesEntity).delete({});
        await db.getRepository(CustomersEntity).delete({});
        customer = await db.getRepository(CustomersEntity).save({
            name: 'John Doe',
            email: 'john@doe.com',
            cpf: '111.111.111-11',
        });
        vehicle = await db.getRepository(VehiclesEntity).save({
            brand: 'Fiat',
            model: 'Uno',
            licensePlate: 'ABC-1234',
            customer,
        });
    });

    it('should not create a accident, customer dont found', async () => {
        const response = await server.inject({
            method: 'POST',
            url: `/customers/${randomUUID()}/vehicles/${vehicle.id}/accidents`,
            payload: [{
                name: 'John Tre',
                email: 'john@tre.com',
                cpf: '222.222.222-22'
            }]
        });
        expect(response.statusCode).toBe(404);
    });

    it('should not create a accident, customer dont found', async () => {
        const response = await server.inject({
            method: 'POST',
            url: `/customers/${customer.id}/vehicles/${randomUUID()}/accidents`,
            payload: [{
                name: 'John Tre',
                email: 'john@tre.com',
                cpf: '222.222.222-22'
            }]
        });
        expect(response.statusCode).toBe(404);
    });

    it('should not create a accident, customer dont found', async () => {
        const response = await server.inject({
            method: 'POST',
            url: `/customers/${customer.id}/vehicles/${vehicle.id}/accidents`,
            payload: [{
                name: 'John Tre',
                email: 'john@tre.com',
                cpf: '222.222.222-22'
            }]
        });
        expect(response.statusCode).toBe(201);
    });
});