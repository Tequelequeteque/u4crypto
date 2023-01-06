import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { CustomersEntity } from '../entities/customers.entity';
import { IUpdateCustomerInput } from '../services/customers/update.service';
import { IService } from '../services/interface.service';

export class CustomersController {

    constructor(
        private readonly createService: IService<CustomersEntity, CustomersEntity>,
        private readonly findService: IService<string, CustomersEntity>,
        private readonly updateService: IService<IUpdateCustomerInput, CustomersEntity>
    ) { }

    public createCustomers = async (
        request: Request,
        h: ResponseToolkit
    ): Promise<ResponseObject | CustomersEntity> => {
        const customer = await this.createService.execute(request.payload as CustomersEntity);
        return h.response(customer).code(201);
    }

    public findOneByIdCustomers = async (
        request: Request,
        h: ResponseToolkit
    ): Promise<ResponseObject | CustomersEntity> => {
        return this.findService.execute(request.params.customerId);
    }

    public updateCustomers = async (
        request: Request,
        h: ResponseToolkit
    ): Promise<ResponseObject | CustomersEntity> => {
        return this.updateService.execute({
            id: request.params.customerId,
            customer: request.payload as Partial<CustomersEntity>
        });
    }
}