import Joi from 'joi';

export const paramsCustomerIdValidate = Joi.object({
    customerId: Joi.string().uuid().required()
}).options({
    abortEarly: false,
    stripUnknown: true,
});