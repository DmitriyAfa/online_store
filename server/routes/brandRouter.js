const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRoleMiddleware");
router.post("/", checkRole("ADMIN"), brandController.create); // create a brand
router.get("/", brandController.getAll); //  get a brand
// router.delete("/"); //  delete a brand

module.exports = router;
