import Joi from "joi";
import { customersSchema } from "./customers.schema";

export const vehiclesSchema = Joi.object({
    id: Joi.string().uuid().required(),
    model: Joi.string().required(),
    licensePlate: Joi.string().required(),
    brand: Joi.string().required(),
    customer: customersSchema,
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
})