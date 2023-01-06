import Boom from '@hapi/boom';
import { CustomersEntity } from '../../entities/customers.entity';
import { ICustomersRepository } from '../../repositories/customers.repository';
import { IService } from '../interface.service';

export class FindOneCustomerService implements IService<string, CustomersEntity>{
    constructor(
        private readonly repository: ICustomersRepository
    ) { }

    public async execute(id: string): Promise<CustomersEntity> {
        const customer = await this.repository.findOneById(id);
        if (!customer) {
            throw Boom.notFound('Customer not found');
        }
        return customer;
    }
}