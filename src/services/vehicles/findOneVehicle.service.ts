import Boom from "@hapi/boom";
import { VehiclesEntity } from "../../entities/vehicles.entity";
import { ICustomersRepository } from "../../repositories/customers.repository";
import { IVehiclesRepository } from "../../repositories/vehicles.repository";
import { IService } from "../interface.service";

export interface IFindOneVehicleInput {
    customerId: string;
    vehicleId: string;
}

export class FindOneVehicleService implements IService<IFindOneVehicleInput, VehiclesEntity>{
    constructor(
        private readonly customersRepository: ICustomersRepository,
        private readonly vehiclesRepository: IVehiclesRepository,
    ) { }

    public execute = async (data: IFindOneVehicleInput): Promise<VehiclesEntity> => {
        await this.getCustomer(data);
        const existVehicle = await this.getVehicle(data);
        return existVehicle;
    }

    private getCustomer = async (data: IFindOneVehicleInput) => {
        const existCustomer = await this.customersRepository.findOneById(data.customerId);
        if (!existCustomer) {
            throw Boom.notFound('Customer not found');
        }
    }

    private getVehicle = async (data: IFindOneVehicleInput) => {
        const existVehicle = await this.vehiclesRepository.findOneByCustomerIdAndVehicleId(data.customerId, data.vehicleId);
        if (!existVehicle) {
            throw Boom.notFound('Vehicle not found');
        }
        return existVehicle;
    }
}