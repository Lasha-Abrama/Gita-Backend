module.exports = (req, res, next) => {
  if (Math.random() > 0.5) {
    return res
      .status(403)
      .json({ message: "This Random Fact Request is Blocked!" });
  }
  next();
};
