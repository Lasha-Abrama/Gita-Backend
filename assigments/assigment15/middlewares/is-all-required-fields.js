module.exports = (req, res, next) => {
  if (
    !req.body ||
    !req.body.category ||
    !req.body.price ||
    !req.body.currency
  ) {
    return res
      .status(400)
      .json({ message: "category, price and currrency are required" });
  }

  if (typeof req.body.price !== "number" || req.body.price < 10) {
    return res.status(400).json({
      message: "Price must be a number and more than 10",
    });
  }

  next();
};
