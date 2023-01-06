import { AccidentsEntity } from '../entities/accidents.entity';
import { CustomersEntity } from '../entities/customers.entity';
import { VehiclesEntity } from '../entities/vehicles.entity';
import { IRepositories } from '../repositories';
import { CreateAccidentsService, ICreateAccidentsInput } from './accidents/create.service';
import { FindAccidentsService, IFindAccidentsInput } from './accidents/findAccidents.service';
import { CreateCustomerService } from './customers/create.service';
import { FindOneCustomerService } from './customers/findOneCustomer.service';
import { IUpdateCustomerInput, UpdateCustomersService } from './customers/update.service';
import { IService } from './interface.service';
import { CreateVehiclesService, ICreateVehiclesInput } from './vehicles/create.service';
import { FindOneVehicleService, IFindOneVehicleInput } from './vehicles/findOneVehicle.service';

export interface IServices {
    customers: {
        create: IService<CustomersEntity, CustomersEntity>
        findOneCustomer: IService<string, CustomersEntity>
        update: IService<IUpdateCustomerInput, CustomersEntity>
    },
    vehicles: {
        create: IService<ICreateVehiclesInput, VehiclesEntity>
        findOneVehicle: IService<IFindOneVehicleInput, VehiclesEntity>
    },
    accidents: {
        create: IService<ICreateAccidentsInput, AccidentsEntity>,
        findAccidentsService: IService<IFindAccidentsInput, Array<AccidentsEntity>>
    }
}

export const loadServices = (repositories: IRepositories): IServices => {
    return {
        customers: {
            create: new CreateCustomerService(repositories.customersRepository),
            findOneCustomer: new FindOneCustomerService(repositories.customersRepository),
            update: new UpdateCustomersService(repositories.customersRepository)
        },
        vehicles: {
            create: new CreateVehiclesService(
                repositories.customersRepository,
                repositories.vehiclesRepository
            ),
            findOneVehicle: new FindOneVehicleService(
                repositories.customersRepository,
                repositories.vehiclesRepository,
            )
        },
        accidents: {
            create: new CreateAccidentsService(
                repositories.customersRepository,
                repositories.vehiclesRepository,
                repositories.involvedsRepository,
                repositories.accidentsRepository
            ),
            findAccidentsService: new FindAccidentsService(
                repositories.customersRepository,
                repositories.vehiclesRepository,
                repositories.accidentsRepository
            )
        }
    }
};