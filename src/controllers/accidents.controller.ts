import { Request, ResponseToolkit } from "@hapi/hapi";
import { AccidentsEntity } from "../entities/accidents.entity";
import { ICreateAccidentsInput } from "../services/accidents/create.service";
import { IFindAccidentsInput } from "../services/accidents/findAccidents.service";
import { IService } from "../services/interface.service";

export class AccidentsController {
    constructor(
        private readonly createAccidentsService: IService<ICreateAccidentsInput, AccidentsEntity>,
        private readonly findAccidentsService: IService<IFindAccidentsInput, Array<AccidentsEntity>>
    ) { }

    public createAccidents = async (
        request: Request,
        h: ResponseToolkit
    ) => {
        const accident = await this.createAccidentsService.execute({
            customerId: request.params.customerId,
            vehicleId: request.params.vehicleId,
            involveds: request.payload
        } as ICreateAccidentsInput);
        return h.response(accident).code(201);
    }

    public findAccidents = async (
        request: Request,
        h: ResponseToolkit
    ) => {
        return this.findAccidentsService.execute({
            customerId: request.params.customerId,
            vehicleId: request.params.vehicleId
        });
    }
}