const Router = require("express");
const router = new Router();

router.post("/");
router.get("/");
router.get("/:id"); // Get the current device

module.exports = router;
