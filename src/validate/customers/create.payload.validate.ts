import Joi from 'joi';

export const createCustomerValidate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
})