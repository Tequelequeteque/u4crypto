import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';
import { IControllers } from './controllers';
import { accidentsSchema, findAccidentsSchema } from './schemas/accidents.schema';
import { customersSchema } from './schemas/customers.schema';
import { vehiclesSchema } from './schemas/vehicles.schema';
import { customerIdAndVehicleIdParamsValidate } from './validate/accidents/customerIdAndVehicleId.params.validate';
import { involvedsPayloadValidate } from './validate/accidents/involveds.payload.validate';
import { createCustomerValidate } from './validate/customers/create.payload.validate';
import { paramsCustomerIdValidate } from './validate/customers/customerId.path.validate';
import { createVehiclesValidate } from './validate/vehicles/create.payload.validate';

export const loadRoutes = (controllers: IControllers): ServerRoute<ReqRefDefaults>[] => {
    const createCustomerRoute = {
        method: 'POST',
        path: '/customers',
        handler: controllers.customersController.createCustomers,
        options: {
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            description: 'Created',
                            schema: customersSchema
                        },
                        '409': {
                            description: 'Conflict',
                        }
                    },
                    payloadType: 'json'
                }
            },
            notes: 'Create a new customer',
            tags: ['api', 'Customers'],
            validate: {
                payload: createCustomerValidate
            }
        }
    };
    const findCustomerByIdCustomerRoute = {
        method: 'GET',
        path: '/customers/{customerId}',
        handler: controllers.customersController.findOneByIdCustomers,
        options: {
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            description: 'Ok',
                            schema: customersSchema
                        },
                        '404': {
                            description: 'Not Found',
                        }
                    },
                    payloadType: 'json'
                }
            },
            notes: 'Find a customer by id',
            tags: ['api', 'Customers'],
            validate: {
                params: paramsCustomerIdValidate,
            }
        }
    };
    const updateCustomerRoute = {
        method: 'PUT',
        path: '/customers/{customerId}',
        handler: controllers.customersController.updateCustomers,
        options: {
            notes: 'Update a customer by id',
            tags: ['api', 'Customers'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            description: 'Ok',
                            schema: customersSchema
                        },
                        '404': {
                            description: 'Not Found',
                        }
                    },
                    payloadType: 'json'
                }
            },
            validate: {
                params: paramsCustomerIdValidate,
                payload: createCustomerValidate
            }
        }
    };
    const createVehicleRoute = {
        method: 'POST',
        path: '/customers/{customerId}/vehicles',
        handler: controllers.vehiclesController.createVehicles,
        options: {
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            description: 'Created',
                            schema: vehiclesSchema
                        },
                        '404': {
                            description: 'Not Found',
                        },
                        '409': {
                            description: 'Conflict',
                        }
                    },
                    payloadType: 'json'
                }
            },
            notes: 'Create a new vehicle for a customer',
            tags: ['api', 'Vehicles'],
            validate: {
                params: paramsCustomerIdValidate,
                payload: createVehiclesValidate
            }
        }
    };
    const findOneByCustomerIdAndVehicleIdRoute = {
        method: 'GET',
        path: '/customers/{customerId}/vehicles/{vehicleId}',
        handler: controllers.vehiclesController.findOneByCustomerIdAndVehicleId,
        options: {
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            description: 'Ok',
                            schema: vehiclesSchema
                        },
                        '404': {
                            description: 'Not Found',
                        },
                    },
                }
            },
            notes: 'Find a vehicle by customer id and vehicle id',
            tags: ['api', 'Vehicles'],
            validate: {
                params: customerIdAndVehicleIdParamsValidate
            }
        }
    }
    const createAccidentsRoute = {
        method: 'POST',
        path: '/customers/{customerId}/vehicles/{vehicleId}/accidents',
        handler: controllers.accidentsController.createAccidents,
        options: {
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            description: 'Created',
                            schema: accidentsSchema
                        },
                        '404': {
                            description: 'Not Found',
                        },
                    },
                    payloadType: 'json'
                },
            },
            notes: 'Create a new accident for a vehicle',
            tags: ['api', 'Accidents'],
            validate: {
                params: customerIdAndVehicleIdParamsValidate,
                payload: involvedsPayloadValidate
            }
        }
    };
    const findAccidentsRoute = {
        method: 'GET',
        path: '/customers/{customerId}/vehicles/{vehicleId}/accidents',
        handler: controllers.accidentsController.findAccidents,
        options: {
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            description: 'Ok',
                            schema: findAccidentsSchema
                        },
                        '404': {
                            description: 'Not Found',
                        },
                    },
                }
            },
            notes: 'Find all accidents by customer id and vehicle id',
            tags: ['api', 'Accidents'],
            validate: {
                params: customerIdAndVehicleIdParamsValidate
            }
        }
    }
    return [
        createCustomerRoute,
        findCustomerByIdCustomerRoute,
        updateCustomerRoute,
        createVehicleRoute,
        findOneByCustomerIdAndVehicleIdRoute,
        createAccidentsRoute,
        findAccidentsRoute
    ];
}