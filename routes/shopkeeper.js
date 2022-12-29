const express = require("express");
const { login, register, addProduct } = require("../controllers/shopkeeper");
const { verifyToken } = require("../utils/jwtFunctions");
const router = express.Router();

router.post("/login", login);
router.post("/register" ,register);
router.post("/addProduct",verifyToken ,addProduct);


module.exports= router;