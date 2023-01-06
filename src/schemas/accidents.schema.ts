import Joi from "joi";
import { customersSchema } from "./customers.schema";
import { vehiclesSchema } from "./vehicles.schema";

export const accidentsSchema = Joi.object({
    customer: customersSchema,
    vehicle: vehiclesSchema,
    involveds: Joi.array().items(customersSchema).min(1).required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
})

export const findAccidentsSchema = Joi.array().items(accidentsSchema)