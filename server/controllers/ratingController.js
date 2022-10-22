const { Rating } = require("../models/models");

class RatingController {
  async create(req, res) {
    const { rate, userId, deviceId } = req.body;
    const rating = await Rating.create({ rate, userId, deviceId });
    return res.json(rating);
  }
  async getAll(req, res) {
    const { userId, deviceId } = req.query;
    let ratings;

    if (!userId && !deviceId) {
      ratings = await Rating.findAll();
    }
    if (!userId && deviceId) {
      ratings = await Rating.findAndCountAll({ where: { deviceId } });
    }
    if (userId && deviceId) {
      ratings = await Rating.findAll({ where: { userId, deviceId } });
    }
    return res.json(ratings);
  }
}

module.exports = new RatingController();
