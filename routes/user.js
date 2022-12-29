const express = require("express");
const { login, register, uploadImage } = require("../controllers/user");
const { verifyToken } = require("../utils/jwtFunctions");
const router = express.Router();


router.post("/register" ,register);
router.post("/login", login);
router.post("/uploadImage",verifyToken ,uploadImage);

module.exports= router;