import Joi from "joi";

export const createVehiclesValidate = Joi.object({
    model: Joi.string().required(),
    licensePlate: Joi.string().required(),
    brand: Joi.string().required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
});