const jwt = require("jsonwebtoken");

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "User is unauthorized",
    });
  }

  const accessToken = authHeader.split(" ")[1];

  const payload = verifyToken(accessToken, "JWT_SECRET");

  req.user = payload;

  next();
};

module.exports = authenticate;
