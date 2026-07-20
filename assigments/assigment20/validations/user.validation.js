const { z } = require("zod");

const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must contain at least 2 characters")
  .max(50, "Name must not exceed 50 characters");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Email is not valid"));

const createUserSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
  })
  .strict();

const updateUserSchema = z
  .object({
    name: nameSchema.optional(),
  })
  .strict()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

module.exports = {
  createUserSchema,
  updateUserSchema,
};
