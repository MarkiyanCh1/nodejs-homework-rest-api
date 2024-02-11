import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const userSignupSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required password field" }),

  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.pattern.base": "Email is invalid",
  }),

  subscription: Joi.string(),
});

export const userSigninSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required password field" }),

  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
});

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().min(6).required(),
});
