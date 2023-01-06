import { DataSource, Repository } from "typeorm";
import { AccidentsEntity } from "../entities/accidents.entity";

export interface IAccidentsRepository {
    save(data: AccidentsEntity): Promise<AccidentsEntity>;
    findAccidentsByCustomerIdAndVehicleId(customerId: string, vehicleId: string): Promise<Array<AccidentsEntity>>
}

export class AccidentsRepository implements IAccidentsRepository {
    private readonly repository: Repository<AccidentsEntity>;
    constructor(connection: DataSource) {
        this.repository = connection.getRepository(AccidentsEntity);
    }
    public save = (data: AccidentsEntity): Promise<AccidentsEntity> => {
        return this.repository.save(data);
    }

    findAccidentsByCustomerIdAndVehicleId = (customerId: string, vehicleId: string): Promise<Array<AccidentsEntity>> => {
        return this.repository.findBy({ customer: { id: customerId }, vehicle: { id: vehicleId } });
    }
}