const jwt = require("jsonwebtoken");

// Receive tokens and compare it to secretKey
const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

// receives token from request headers and verify it - used to authenticate logged in user
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
