const jwt = require("jsonwebtoken");

function getToken(authorization = "") {
  const [type, token] = authorization.split(" ");
  return type === "Bearer" && token ? token : null;
}

module.exports = (req, res, next) => {
  try {
    const token = getToken(req.headers.authorization);

    if (!token) {
      return res.status(401).json({ message: "Authentication is required" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Your session is invalid or has expired" });
  }
};
