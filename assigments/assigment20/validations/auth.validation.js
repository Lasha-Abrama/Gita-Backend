const { z } = require("zod");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address"));

const passwordSchema = z
  .string()
  .min(6, "Password must contain at least 6 characters")
  .max(72, "Password must not exceed 72 characters");

const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Username must contain at least 2 characters")
      .max(50, "Username must not exceed 50 characters"),
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

const signInSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

module.exports = { signUpSchema, signInSchema };
