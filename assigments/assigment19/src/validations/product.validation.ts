import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(20).required(),

  description: Joi.string().trim().min(3).max(1000).required(),

  price: Joi.number().min(0).required(),

  photo: Joi.string().trim().uri().required(),

  category: Joi.string().trim().min(2).max(50).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(20),

  description: Joi.string().trim().min(3).max(1000),

  price: Joi.number().min(0),

  photo: Joi.string().trim().uri(),

  category: Joi.string().trim().min(2).max(50),
}).min(1); // min(1) for not empty field
