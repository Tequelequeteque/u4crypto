import { Server as HapiServer } from '@hapi/hapi';
import { randomUUID } from 'crypto';
import { DataSource } from "typeorm";
import { Database } from '../../database/database';
import { AccidentsEntity } from '../../entities/accidents.entity';
import { CustomersEntity } from '../../entities/customers.entity';
import { InvolvedsEntity } from '../../entities/involveds.entity';
import { VehiclesEntity } from '../../entities/vehicles.entity';
import { loadServer } from '../../main';

describe('FindById Customers', () => {
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

    it('should find a customer by id', async () => {
        const customer = await db.getRepository('customers').save({
            name: 'Test',
            email: 'john@doe.com',
            cpf: '111.111.111-11',
        });
        const response = await server.inject({
            method: 'GET',
            url: `/customers/${customer.id}`,
        });
        expect(response.statusCode).toBe(200);
        expect(response.result).toMatchObject(customer);
    });

    it('should not find a customer by id', async () => {
        const id = randomUUID();
        const response = await server.inject({
            method: 'GET',
            url: `/customers/${id}`,
        });
        expect(response.statusCode).toBe(404);
    });
});