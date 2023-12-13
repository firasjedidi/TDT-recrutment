const router = require("express").Router();
const {
  create,
  getAllOnlyUser,
  getByArticleId,
  getByUserId,
  update,
  remove,
} = require("../controllers/articleControllers");
const authMiddleware = require('../utils/authMidleware');

router.post("/create", authMiddleware,create);
router.get("/users", authMiddleware,getAllOnlyUser);
router.get("/user", authMiddleware,getByUserId);
router.get("/:id", authMiddleware,getByArticleId);
router.put("/update/:id", authMiddleware,update);
router.delete("/delete/:id", authMiddleware,remove);
module.exports = router;
