function validate(schema, property = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }

    req[property] = result.data;

    next();
  };
}

module.exports = validate;
