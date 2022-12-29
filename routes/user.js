const express = require("express");
const { login, register, uploadImage, buyProduct, getAllCategories, getProductsByCategory, addToCart, addToFavourite, removeFromCart, getProfile , } = require("../controllers/user");
const { verifyToken } = require("../utils/jwtFunctions");
const router = express.Router();
const upload = require("../middlewares/multer");



router.post("/register" ,register);
router.post("/login", login);
router.post("/uploadImage" ,upload.single('upload') ,uploadImage);
router.post("/buyProduct" ,verifyToken, buyProduct);
router.get("/categories",verifyToken, getAllCategories);
router.get("/productsByCategory",verifyToken, getProductsByCategory);
router.put("/addToCart",verifyToken, addToCart);
router.put("/addToFavourite",verifyToken, addToFavourite);
router.put("/removeProductFromCart",verifyToken, removeFromCart);
router.get("/getProfile",verifyToken, getProfile);


module.exports= router;