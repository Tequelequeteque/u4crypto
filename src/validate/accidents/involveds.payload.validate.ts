import Joi from "joi";

export const involvedsPayloadValidate = Joi.array()
    .items(Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        cpf: Joi.string().required(),
    }))
    .min(1)
    .options({
        abortEarly: false,
        stripUnknown: true
    })