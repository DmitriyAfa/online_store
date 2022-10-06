const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
router.post("/", brandController.create); // create a brand
router.get("/", brandController.getAll); //  get a brand
// router.delete("/"); //  delete a brand

module.exports = router;
