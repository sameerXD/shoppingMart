const bcrypt = require("bcrypt");
const {util} = require("../utils/config");
const { createJwtToken } = require("../utils/jwtFunctions");
const { sendResponse } = require("../utils/response");
const shopkeeperService = require("../database/services/shopkeeperService");
const categoryService = require("../database/services/categoriesService");
const productService = require("../database/services/productService");

exports.register = async (req, res, next)=>{
    try{
        let email = req.body.email;
        let password = req.body.password;

        if(email){
            email = email.toLowerCase();
        }

        const hash = bcrypt.hashSync(password, util.security.saltRounds);
        const postData = await shopkeeperService.create({email:email, password: hash});
        return sendResponse(req, res, postData, true, 200, "", "shopkeeper created");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}


exports.login = async (req, res, next)=>{
    try{
        let email = req.body.email;
        if(email){
            email = email.toLowerCase();
        }

        const myPlaintextPassword = req.body.password;

        const getShopkeeper = await shopkeeperService.findByEmail(email);
        if(!getShopkeeper)return sendResponse(req, res, {}, false, 401, "wrong email", "email not found");

        
        if(!bcrypt.compareSync(myPlaintextPassword,getShopkeeper.password)) return sendResponse(req, res, {}, false, 401, "wrong password", "wrong password");
        
        return sendResponse(req, res, {accessToken : createJwtToken({email:email, role:util.role.shopkeeper})}, true, 200, "", "Login Successfull");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}

exports.addProduct = async (req, res, next)=>{
    try{
        let {categoryId, name, productImage, qty, amount, description} = req.body;

        // convert rupee into paisa
        amount = amount *100;
        const getCategory = await categoryService.findById(categoryId);
        if(!getCategory) return sendResponse(req,res, {},false, 404, "category not found", "wrong category id");
        
        const postProduct = await productService.create({name, productImage, categoryId, qty, amount, description});
        
        const getShopkeeper = await shopkeeperService.findByEmail(req.user.email);
        getShopkeeper.products.push({product:postProduct._id});

        const putShopkeeper = await shopkeeperService.updateById(getShopkeeper);
        
        sendResponse(req, res, putShopkeeper.products, true, 200, "", "product added")
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}

