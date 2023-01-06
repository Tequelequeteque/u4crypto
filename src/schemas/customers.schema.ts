import Joi from "joi";

export const customersSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
});