import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { VehiclesEntity } from "../entities/vehicles.entity";
import { IService } from "../services/interface.service";
import { ICreateVehiclesInput } from "../services/vehicles/create.service";
import { IFindOneVehicleInput } from "../services/vehicles/findOneVehicle.service";

export class VehiclesController {
    constructor(
        private readonly createVehiclesService: IService<ICreateVehiclesInput, VehiclesEntity>,
        private readonly findOneByCustomerIdAndVehicleIdService: IService<IFindOneVehicleInput, VehiclesEntity>,
    ) { }

    public createVehicles = async (
        request: Request,
        h: ResponseToolkit
    ): Promise<ResponseObject | VehiclesEntity> => {
        const vehicle = await this.createVehiclesService.execute({
            customerId: request.params.customerId,
            vehicle: request.payload as VehiclesEntity,
        });
        return h.response(vehicle).code(201);
    }

    public findOneByCustomerIdAndVehicleId = async (
        request: Request,
        h: ResponseToolkit
    ): Promise<ResponseObject | VehiclesEntity> => {
        return this.findOneByCustomerIdAndVehicleIdService.execute({
            customerId: request.params.customerId,
            vehicleId: request.params.vehicleId,
        });
    }
}