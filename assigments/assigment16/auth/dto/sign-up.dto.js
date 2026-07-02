const { default: z } = require("zod");

const signUpDto = z.object({
  fullName: z
    .string()
    .trim()
    .refine(
      (name) => name.split(/\s+/).length >= 2,
      "Full name must contain at least first and last name",
    ),
  email: z.email(),
  password: z.string().min(6, "password must be at least 6 char"),
  birthDate: z.coerce.date(),
});

module.exports = { signUpDto };
