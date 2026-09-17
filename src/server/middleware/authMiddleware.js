const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization token required",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Authorization token required",
    });
  }
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //why we did the next piece of code needs to know who made the request
    req.user = decoded;
    //after succesful verfication we do next if verification fails next never happens
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
