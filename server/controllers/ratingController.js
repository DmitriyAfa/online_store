const { Rating } = require("../models/models");

class RatingController {
  async create(req, res) {
    const { rate, userId, deviceId } = req.body;
    const rating = await Rating.create({ rate, userId, deviceId });
    return res.json(rate);
  }
  async getAll(req, res) {
    const ratings = await Rating.findAll();
    return res.json(ratings);
  }
}

module.exports = new RatingController();
