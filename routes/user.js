const express = require("express");
const { login, register, uploadImage } = require("../controllers/user");
const { verifyToken } = require("../utils/jwtFunctions");
const router = express.Router();
const upload = require("../middlewares/multer");



router.post("/register" ,register);
router.post("/login", login);
router.post("/uploadImage" ,upload.single('upload') ,uploadImage);

module.exports= router;