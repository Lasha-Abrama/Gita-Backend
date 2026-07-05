const { z } = require("zod");

const updateBlogDto = z
  .object({
    title: z.string().trim().min(1, "Title is required").optional(),
    content: z.string().trim().min(1, "Content is required").optional(),
  })
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

module.exports = { updateBlogDto };
