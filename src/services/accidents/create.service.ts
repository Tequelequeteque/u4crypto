import Boom from "@hapi/boom";
import { AccidentsEntity } from "../../entities/accidents.entity";
import { CustomersEntity } from "../../entities/customers.entity";
import { InvolvedsEntity } from "../../entities/involveds.entity";
import { IAccidentsRepository } from "../../repositories/accidents.repository";
import { ICustomersRepository } from "../../repositories/customers.repository";
import { IInvolvedsRepository } from "../../repositories/involveds.repository";
import { IVehiclesRepository } from "../../repositories/vehicles.repository";
import { IService } from "../interface.service";

export interface ICreateAccidentsInput {
    customerId: string,
    vehicleId: string,
    involveds: Array<InvolvedsEntity>
}

export class CreateAccidentsService implements IService<ICreateAccidentsInput, AccidentsEntity> {
    constructor(
        private readonly customersRepository: ICustomersRepository,
        private readonly vehiclesRepository: IVehiclesRepository,
        private readonly involvedsRepository: IInvolvedsRepository,
        private readonly accidentsRepository: IAccidentsRepository
    ) { }

    public execute = async ({ customerId, vehicleId, involveds }: ICreateAccidentsInput): Promise<AccidentsEntity> => {
        const existsCustomer = await this.getCustomer(customerId);
        const existsVehicle = await this.getVehicle(existsCustomer, vehicleId);
        let involvedsEntity: Array<InvolvedsEntity> = [];
        involvedsEntity = await this.involvedsRepository.saveIfNotExists(involveds);
        const accident = Object.assign(new AccidentsEntity(), { customer: existsCustomer, vehicle: existsVehicle, involveds: involvedsEntity });
        return this.accidentsRepository.save(accident);
    }

    private getVehicle = async (existsCustomer: CustomersEntity, vehicleId: string) => {
        const existsVehicle = await this.vehiclesRepository.findOneByCustomerIdAndVehicleId(existsCustomer.id as string, vehicleId);
        if (!existsVehicle) { throw Boom.notFound("Vehicle not found"); }
        return existsVehicle;
    }

    private getCustomer = async (customerId: string) => {
        const existsCustomer = await this.customersRepository.findOneById(customerId);
        if (!existsCustomer) { throw Boom.notFound("Customer not found"); }
        return existsCustomer;
    }
}