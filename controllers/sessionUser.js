const { util } = require("../utils/config");
const { createJwtToken } = require("../utils/jwtFunctions");
const { sendResponse } = require("../utils/response");
const sessionUserService = require("../database/services/sessionUserService");
const categoriesService = require("../database/services/categoriesService");
const productService = require("../database/services/productService");

exports.anonymousLogin = async (req, res, next)=>{
    try{
        const ip = req.ip;
        const getAnonymousUser = await sessionUserService.findByUid(ip);
        if(getAnonymousUser) return sendResponse(req, res, {accessToken : createJwtToken({email:ip, role:util.role.anonymousUser})}, true, 200, "", "Login Successfull");
        const postData = await sessionUserService.create({uid:ip});
        
        return sendResponse(req, res, {accessToken : createJwtToken({email:ip, role:util.role.anonymousUser})}, true, 200, "", "Login Successfull");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}

exports.getAllCategories = async (req, res, next)=>{
    try{
        if(req.user.role != util.role.anonymousUser) return sendResponse(req, res, {}, true, 401, "", "user is not anonymous user");

        const getCategories = await categoriesService.findAll();
        return sendResponse(req, res, getCategories, true, 200, "", "fetched all categories");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}



exports.getProductsByCategory = async(req, res, next)=>{
    try{
        if(req.user.role != util.role.anonymousUser) return sendResponse(req, res, {}, true, 401, "", "user is not anonymous user");

        const {categoryId} = req.query;
        const getProducts = await productService.findByCategoryId(categoryId);
        return sendResponse(req, res, getProducts, true, 200, "", "fetched all products by category");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}

exports.addToCart = async (req, res, next)=>{
    try{
        if(req.user.role != util.role.anonymousUser) return sendResponse(req, res, {}, true, 401, "", "user is not anonymous user");

        const {product} = req.body;
        const getAnonymousUser = await sessionUserService.findByUid(req.user.email);
        getAnonymousUser.cart.push({product:product});
        const putAnonymousUser = await sessionUserService.updateById(getAnonymousUser);
        return sendResponse(req, res, putAnonymousUser.cart, true, 200, "", "product added to cart");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}

exports.addToFavourite = async (req, res, next)=>{
    try{
        if(req.user.role != util.role.anonymousUser) return sendResponse(req, res, {}, true, 401, "", "user is not anonymous user");

        const {product} = req.body;
        const getAnonymousUser = await sessionUserService.findByUid(req.user.email);
        getAnonymousUser.favorite.push({product:product});
        const putAnonymousUser = await sessionUserService.updateById(getAnonymousUser);
        return sendResponse(req, res, putAnonymousUser.cart, true, 200, "", "product added to favorite");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}


