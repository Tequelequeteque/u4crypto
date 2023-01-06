import { Server as HapiServer } from '@hapi/hapi';
import { randomUUID } from 'crypto';
import { DataSource } from "typeorm";
import { Database } from "../../database/database";
import { AccidentsEntity } from '../../entities/accidents.entity';
import { CustomersEntity } from '../../entities/customers.entity';
import { InvolvedsEntity } from '../../entities/involveds.entity';
import { VehiclesEntity } from '../../entities/vehicles.entity';
import { loadServer } from "../../main";

describe('Update Customers', () => {
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

    it('should update a customer', async () => {
        const customer = await db.getRepository(CustomersEntity).save({
            name: 'John Doe',
            email: 'john@doe.com',
            cpf: '111.111.111-11'
        })
        const updates = {
            name: 'John Tre',
            email: 'john@tre.com',
            cpf: '111.111.111-12'
        }
        const response = await server.inject({
            method: 'PUT',
            url: `/customers/${customer.id}`,
            payload: updates
        });
        expect(response.statusCode).toBe(200);
        expect(response.result).toMatchObject(updates);
    });


    it('should update a customer', async () => {
        const updates = {
            name: 'John Tre',
            email: 'john@tre.com',
            cpf: '111.111.111-12'
        }
        const response = await server.inject({
            method: 'PUT',
            url: `/customers/${randomUUID()}`,
            payload: updates
        });
        expect(response.statusCode).toBe(404);
    });
});