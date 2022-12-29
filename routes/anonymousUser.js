const express = require("express");
const { anonymousLogin, getAllCategories, getProductsByCategory, addToCart, addToFavourite, getProfile, removeFromCart } = require("../controllers/sessionUser");
const { verifyToken } = require("../utils/jwtFunctions");
const router = express.Router();

router.post("/login", anonymousLogin);
router.get("/categories",verifyToken, getAllCategories);
router.get("/productsByCategory",verifyToken, getProductsByCategory);
router.put("/addToCart",verifyToken, addToCart);
router.put("/addToFavourite",verifyToken, addToFavourite);
router.get("/getProfile",verifyToken, getProfile);
router.put("/removeProductFromCart",verifyToken, removeFromCart);



module.exports= router;