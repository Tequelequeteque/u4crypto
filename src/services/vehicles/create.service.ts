import Boom from "@hapi/boom";
import { VehiclesEntity } from "../../entities/vehicles.entity";
import { ICustomersRepository } from "../../repositories/customers.repository";
import { IVehiclesRepository } from "../../repositories/vehicles.repository";
import { IService } from "../interface.service";

export interface ICreateVehiclesInput {
    customerId: string;
    vehicle: VehiclesEntity;
}

export class CreateVehiclesService implements IService<ICreateVehiclesInput, VehiclesEntity> {
    constructor(
        private readonly customersRepository: ICustomersRepository,
        private readonly vehiclesRepository: IVehiclesRepository,
    ) { }

    public execute = async (data: ICreateVehiclesInput): Promise<VehiclesEntity> => {
        const existCustomer = await this.customersRepository.findOneById(data.customerId);
        if (!existCustomer) {
            throw Boom.notFound('Customer not found');
        }
        const existVehicle = await this.vehiclesRepository.findOneByLicensePlate(data.vehicle.licensePlate);
        if (existVehicle) {
            throw Boom.conflict('License plate already registered');
        }
        return this.vehiclesRepository.save(Object.assign(new VehiclesEntity, { customer: existCustomer, ...data.vehicle }));
    }
}