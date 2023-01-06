import Boom from "@hapi/boom";
import { AccidentsEntity } from "../../entities/accidents.entity";
import { IAccidentsRepository } from "../../repositories/accidents.repository";
import { ICustomersRepository } from "../../repositories/customers.repository";
import { IVehiclesRepository } from "../../repositories/vehicles.repository";
import { IService } from "../interface.service";

export interface IFindAccidentsInput {
    customerId: string;
    vehicleId: string;
}

export class FindAccidentsService implements IService<IFindAccidentsInput, Array<AccidentsEntity>>{
    constructor(
        private readonly customersRepository: ICustomersRepository,
        private readonly vehiclesRepository: IVehiclesRepository,
        private readonly accidentsRepository: IAccidentsRepository,
    ) { }

    public execute = async ({ customerId, vehicleId }: IFindAccidentsInput): Promise<Array<AccidentsEntity>> => {
        const existCustomer = await this.customersRepository.findOneById(customerId);
        if (!existCustomer) { throw Boom.notFound('Customer not found'); }

        const existVehicle = await this.vehiclesRepository.findOneByCustomerIdAndVehicleId(customerId, vehicleId);
        if (!existVehicle) { throw Boom.notFound('Vehicle not found'); }

        return this.accidentsRepository.findAccidentsByCustomerIdAndVehicleId(customerId, vehicleId);
    }
}