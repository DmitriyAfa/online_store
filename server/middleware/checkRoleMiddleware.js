const jwt = require("jsonwebtoken");
const { fn } = require("sequelize");
module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; //Bearer dasdjasijd
      if (!token) {
        res.status(401).json({ message: "Not authorized" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "No access" });
      }
      req.user = decoded;
      next(); // calling the following middleware
    } catch (e) {
      res.status(401).json({ message: "Not authorized" });
    }
  };
};
