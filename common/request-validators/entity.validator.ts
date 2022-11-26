import Joi from "joi"

export const entitySchema = Joi.object({
    icon: Joi.string().pattern(new RegExp(/.*?\.[\w:]+/)).required(),
    name: Joi.string().required(),
    description: Joi.string(),
    // detectionList: Joi.array()
});

