const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), typeController.create); // create a type
router.get("/", typeController.getAll); //  get a type
// router.delete("/"); //  delete a type

module.exports = router;
