import { Server as HapiServer } from '@hapi/hapi';
import { randomUUID } from 'crypto';
import { DataSource } from "typeorm";
import { Database } from "../../database/database";
import { AccidentsEntity } from '../../entities/accidents.entity';
import { CustomersEntity } from '../../entities/customers.entity';
import { InvolvedsEntity } from '../../entities/involveds.entity';
import { VehiclesEntity } from '../../entities/vehicles.entity';
import { loadServer } from "../../main";

describe('Create Vehicle', () => {
    let db: DataSource;
    let server: HapiServer;
    let customer: CustomersEntity

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
        await db.getRepository(InvolvedsEntity
        ).delete({});
        await db.getRepository(AccidentsEntity).delete({});
        await db.getRepository(VehiclesEntity).delete({});
        await db.getRepository(CustomersEntity).delete({});
        customer = await db.getRepository(CustomersEntity).save({
            name: 'John Doe',
            email: 'john@doe.com',
            cpf: '111.111.111-11',
        });
    });

    it('should create a vehicle', async () => {
        const payload = {
            brand: 'Fiat',
            model: 'Uno',
            licensePlate: 'ABC-1234',
        }
        const response = await server.inject({
            method: 'POST',
            url: `/customers/${customer.id}/vehicles`,
            payload
        });
        expect(response.statusCode).toBe(201);
    });

    it('should not create a vehicle, customer dont found', async () => {
        const payload = {
            brand: 'Fiat',
            model: 'Uno',
            licensePlate: 'ABC-1234',
        }
        const response = await server.inject({
            method: 'POST',
            url: `/customers/${randomUUID()}/vehicles`,
            payload
        });
        expect(response.statusCode).toBe(404);
    });

    it('should not create a vehicle, license plate already registered', async () => {
        const payload = {
            brand: 'Fiat',
            model: 'Uno',
            licensePlate: 'ABC-1234',
        }
        let response = await server.inject({
            method: 'POST',
            url: `/customers/${customer.id}/vehicles`,
            payload
        });
        expect(response.statusCode).toBe(201);
        response = await server.inject({
            method: 'POST',
            url: `/customers/${customer.id}/vehicles`,
            payload
        });
        expect(response.statusCode).toBe(409);
    });

});