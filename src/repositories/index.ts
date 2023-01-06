import { DataSource } from 'typeorm';
import { AccidentsRepository, IAccidentsRepository } from './accidents.repository';
import { CustomersRepository, ICustomersRepository } from './customers.repository';
import { IInvolvedsRepository, InvolvedsRepository } from './involveds.repository';
import { IVehiclesRepository, VehiclesRepository } from './vehicles.repository';

export interface IRepositories {
    customersRepository: ICustomersRepository;
    vehiclesRepository: IVehiclesRepository;
    involvedsRepository: IInvolvedsRepository;
    accidentsRepository: IAccidentsRepository;
}

export const loadRepositories = (connection: DataSource): IRepositories => {
    return {
        customersRepository: new CustomersRepository(connection),
        vehiclesRepository: new VehiclesRepository(connection),
        involvedsRepository: new InvolvedsRepository(connection),
        accidentsRepository: new AccidentsRepository(connection)
    };
}