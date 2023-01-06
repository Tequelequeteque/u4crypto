import { IServices } from '../services';
import { AccidentsController } from './accidents.controller';
import { CustomersController } from './customers.controller';
import { VehiclesController } from './vehicles.controller';

export interface IControllers {
    customersController: CustomersController;
    vehiclesController: VehiclesController;
    accidentsController: AccidentsController;
}

export const loadControllers = (services: IServices): IControllers => {
    return {
        customersController: new CustomersController(
            services.customers.create,
            services.customers.findOneCustomer,
            services.customers.update
        ),
        vehiclesController: new VehiclesController(
            services.vehicles.create,
            services.vehicles.findOneVehicle
        ),
        accidentsController: new AccidentsController(
            services.accidents.create,
            services.accidents.findAccidentsService
        ),
    }
}