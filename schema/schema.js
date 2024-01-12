import Joi from "joi";

export const addSchema = Joi.object({
  name: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

export const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
