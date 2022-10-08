const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async registrtion(req, res) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      // This is a simple version of validation.
      return next(ApiError.badRequiest("incorrect email or password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequiest("The user with the name exists"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password, role } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("A user with this name was not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Wrong password"));
    }
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    //makes a new token
    const { id, email, role } = req.user;
    const token = generateJWT(id, email, role);
    return res.json({ token });
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
