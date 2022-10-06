const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.registrtion);
router.post("/login", userController.login);
router.get("/auth", userController.check); // User authentication check (JWT)
module.exports = router;
