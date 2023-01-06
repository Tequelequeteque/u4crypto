import Boom from '@hapi/boom';
import { CustomersEntity } from '../../entities/customers.entity';
import { ICustomersRepository } from '../../repositories/customers.repository';
import { IService } from '../interface.service';

export class CreateCustomerService implements IService<CustomersEntity, CustomersEntity> {
    constructor(private readonly customersRepository: ICustomersRepository) { }
    public execute = async (customer: CustomersEntity): Promise<CustomersEntity> => {
        const hasCustomer = await this.customersRepository.findOneByEmailOrCpf(customer.email, customer.cpf);
        if (hasCustomer) {
            throw Boom.conflict('Customer already exists');
        }
        return this.customersRepository.save(customer);
    }
}