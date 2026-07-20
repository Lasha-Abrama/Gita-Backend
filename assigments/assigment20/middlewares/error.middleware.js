function errorMiddleware(error, req, res, next) {
  console.error(error);

  if (error.code === 11000) {
    const field =
      Object.keys(error.keyPattern || error.keyValue || {})[0] || "field";

    return res.status(409).json({
      message: `${field} already exists`,
    });
  }

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));

    return res.status(400).json({
      message: "Database validation error",
      errors,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${error.path}`,
    });
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal server error" : error.message,
  });
}

module.exports = errorMiddleware;
