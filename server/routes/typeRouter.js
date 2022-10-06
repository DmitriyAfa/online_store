const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");

router.post("/", typeController.create); // create a type
router.get("/", typeController.getAll); //  get a type
// router.delete("/"); //  delete a type

module.exports = router;
