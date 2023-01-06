import { DataSource, Repository } from 'typeorm';
import { CustomersEntity } from '../entities/customers.entity';

export interface ICustomersRepository {
    save(customer: CustomersEntity): Promise<CustomersEntity>;
    findOneById(id: string): Promise<CustomersEntity | null>;
    findOneByEmailOrCpf(email: string, cpf: string): Promise<CustomersEntity | null>;
    update(customer: CustomersEntity): Promise<CustomersEntity>;
}

export class CustomersRepository implements ICustomersRepository {
    private readonly repository: Repository<CustomersEntity>;
    constructor(connection: DataSource) {
        this.repository = connection.getRepository(CustomersEntity);
    }

    save(customer: CustomersEntity) {
        return this.repository.save(customer);
    }

    findOneById(id: string) {
        return this.repository.findOneBy({ id });
    }

    findOneByEmailOrCpf(email: string, cpf: string) {
        return this.repository.findOne({ where: [{ email }, { cpf }] });
    }

    update(customer: CustomersEntity) {
        return this.repository.save(customer, { reload: true });
    }
}