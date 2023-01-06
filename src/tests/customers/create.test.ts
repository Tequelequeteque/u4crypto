import { Server as HapiServer } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import { Database } from '../../database/database';
import { AccidentsEntity } from '../../entities/accidents.entity';
import { CustomersEntity } from '../../entities/customers.entity';
import { InvolvedsEntity } from '../../entities/involveds.entity';
import { VehiclesEntity } from '../../entities/vehicles.entity';
import { loadServer } from '../../main';

describe('Create Customers', () => {
    let db: DataSource;
    let server: HapiServer;
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
    });

    it('should create a customer', async () => {
        const customer = {
            name: 'Test',
            email: 'john@doe.com',
            cpf: '111.111.111-11',
        };
        const response = await server.inject({
            method: 'POST',
            url: '/customers',
            payload: customer,
        });
        expect(response.statusCode).toBe(201);
    });

    it('should not create a customer with same cpf', async () => {
        const customer = {
            name: 'Test',
            email: 'john@doe.com',
            cpf: '111.111.111-11',
        };
        let response = await server.inject({
            method: 'POST',
            url: '/customers',
            payload: customer,
        });
        expect(response.statusCode).toBe(201);
        response = await server.inject({
            method: 'POST',
            url: '/customers',
            payload: customer,
        });
        expect(response.statusCode).toBe(409);
    });
});