const express = require("express");
const { adminLogin, addCategories } = require("../controllers/admin");
const { verifyToken } = require("../utils/jwtFunctions");
const router = express.Router();

router.post("/login", adminLogin);
router.post("/addCategory",verifyToken ,addCategories);

module.exports= router;