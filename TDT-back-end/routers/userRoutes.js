const router = require("express").Router();
const {updateUser} = require("../controllers/userControllers");
const authMiddleware = require('../utils/authMidleware');

router.put("/update",authMiddleware, updateUser);

module.exports = router;