const ApiError = require("../error/ApiError");
class UserController {
  async registrtion(req, res) {}
  async login(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequiest("Не задан ID"));
    }
    res.json(id);
  }
}

module.exports = new UserController();

/**
  async check(req, res) {
    const query = req.query;
    res.json(query); // http://localhost:5000/api/user/auth?id=5&message=hi ---> {"id":"5","message":"hi"}
  }
 */

/**
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequiest("Не задан ID"));
    }
    res.json(id);
  }
 */
