const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body; // get the data from the body of the request
      const { img } = req.files; // get the img
      let fileName = uuid.v4() + ".jpg"; // generates a unique name
      /**
        *.mv is the function to move the file elsewhere on your server. Can take a callback or return a promise.
        
        *The path.resolve() method is used to resolve a sequence of path-segments to an absolute path.
          path. resolve() преобразует последовательность путей или сегментов пути в абсолютный путь

        * __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.

        */
      img.mv(path.resolve(__dirname, "..", "static", fileName)); // move this img to the "static" path

      //After moving the img we need to create a "Device"
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequiest(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query; // get it from the query string
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;

    if (!brandId && !typeId) {
      // all devices

      /**
       This is useful when dealing with queries related to pagination where you want to retrieve data with a limit
        and offset but also need to know the total number of records that match the query.
       */
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      // all devices with brandId
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      // all devices with typeId
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      // all devices with brandId and typeId
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    // get a Device by id
    const { id } = req.params; // id from deviceRouter ---> router.get("/:id", deviceController.getOne);
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return res.json(device);
  }
  async putRate(req, res) {
    const { id, rating } = req.body;

    let data = await Device.update(
      {
        rating: rating,
      },
      {
        where: { id },
      }
    );
    return res.json(data);
  }
}

module.exports = new DeviceController();
