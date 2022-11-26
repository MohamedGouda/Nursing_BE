import Joi from "joi"

export const userSchema = Joi.object({
    firstName: Joi.string().pattern(new RegExp(/^[^-\s\d][a-zA-Z\s-]+$/)).required(),
    lastName:  Joi.string().pattern(new RegExp(/^[^-\s\d][a-zA-Z\s-]+$/)).required(),
    password: Joi.string().length(8).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(), //pattern EAU ^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$.
    roleId: Joi.number().required(),
});

