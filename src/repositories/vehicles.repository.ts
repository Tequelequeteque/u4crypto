import { DataSource, Repository } from "typeorm";
import { VehiclesEntity } from "../entities/vehicles.entity";

export interface IVehiclesRepository {
    save(vehicle: VehiclesEntity): Promise<VehiclesEntity>;
    findOneByLicensePlate(licensePlate: string): Promise<VehiclesEntity | null>;
    findOneByCustomerIdAndVehicleId(customerId: string, vehicleId: string): Promise<VehiclesEntity | null>;
}

export class VehiclesRepository implements IVehiclesRepository {
    private readonly repository: Repository<VehiclesEntity>;
    constructor(connection: DataSource) {
        this.repository = connection.getRepository(VehiclesEntity);
    }

    public save(vehicle: VehiclesEntity) {
        return this.repository.save(vehicle);
    }

    public findOneByLicensePlate(licensePlate: string) {
        return this.repository.findOneBy({ licensePlate })
    }

    public findOneByCustomerIdAndVehicleId(customerId: string, vehicleId: string) {
        return this.repository.findOneBy({ id: vehicleId, customer: { id: customerId } })
    }
}