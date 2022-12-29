const express = require("express");
const { login, register, uploadImage, buyProduct , } = require("../controllers/user");
const { verifyToken } = require("../utils/jwtFunctions");
const router = express.Router();
const upload = require("../middlewares/multer");



router.post("/register" ,register);
router.post("/login", login);
router.post("/uploadImage" ,upload.single('upload') ,uploadImage);
router.post("/buyProduct" ,verifyToken, buyProduct);

module.exports= router;