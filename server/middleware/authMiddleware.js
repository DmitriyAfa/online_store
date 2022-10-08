const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Bearer dasdjasijd
    if (!token) {
      res.status(401).json({ message: "Not authorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // calling the following middleware
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
};
