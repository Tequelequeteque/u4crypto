import Joi from 'joi';

export const updateCustomersValidate = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    cpf: Joi.string(),
}).options({
    abortEarly: false,
    stripUnknown: true,
}).min(1);