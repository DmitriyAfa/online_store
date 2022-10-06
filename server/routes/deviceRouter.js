const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");

router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne); // Get the current device

module.exports = router;
