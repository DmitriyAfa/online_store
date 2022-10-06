const Router = require("express");
const router = new Router();

router.post("/registration");
router.post("/login");
router.get("/auth", (req, res) => {
  res.json({ message: "userRouter" }); // http://localhost:5000/api/user/auth
}); // User authentication check (JWT)
module.exports = router;
