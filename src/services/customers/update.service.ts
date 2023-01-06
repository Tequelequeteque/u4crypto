import Boom from "@hapi/boom";
import { CustomersEntity } from "../../entities/customers.entity";
import { ICustomersRepository } from "../../repositories/customers.repository";
import { IService } from "../interface.service";

export interface IUpdateCustomerInput {
    id: string;
    customer: Partial<CustomersEntity>;
}

export class UpdateCustomersService implements IService<IUpdateCustomerInput, CustomersEntity> {
    constructor(private readonly customersRepository: ICustomersRepository) { }
    execute = async ({ id, customer }: IUpdateCustomerInput): Promise<CustomersEntity> => {
        const existsCustomer = await this.customersRepository.findOneById(id);
        if (!existsCustomer) {
            throw Boom.notFound('Customer not found');
        }
        for (const key in customer) {
            existsCustomer[key as keyof CustomersEntity] = customer[key as keyof CustomersEntity] as any;
        }
        return this.customersRepository.update(existsCustomer);
    }
}