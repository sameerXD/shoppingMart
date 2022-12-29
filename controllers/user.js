const sharp = require("sharp");
const { sendResponse } = require("../utils/response");
const userService = require("../database/services/userService");
const productService = require("../database/services/productService");
const shopkeeperService = require("../database/services/shopkeeperService");

const bcrypt = require("bcrypt");
const {util} = require("../utils/config");
const { createJwtToken } = require("../utils/jwtFunctions");

exports.register = async (req, res, next)=>{
    try{
        let email = req.body.email;
        let password = req.body.password;

        if(email){
            email = email.toLowerCase();
        }
        const getUser = await userService.findByEmail(email);
        if(getUser) return sendResponse(req,res,{}, false, 409, "email already exist","email already exist");
        
        const hash = bcrypt.hashSync(password, util.security.saltRounds);
        const postData = await userService.create({email:email, password: hash});
        return sendResponse(req, res, postData, true, 200, "", "user created");
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

        const getUser = await userService.findByEmail(email);
        if(!getUser)return sendResponse(req, res, {}, false, 401, "wrong email", "email not found");

        
        if(!bcrypt.compareSync(myPlaintextPassword,getUser.password)) return sendResponse(req, res, {}, false, 401, "wrong password", "wrong password");
        
        return sendResponse(req, res, {accessToken : createJwtToken({email:email, role:util.role.user})}, true, 200, "", "Login Successfull");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}


exports.uploadImage = async (req, res, next)=>{
    try {
        let path = __dirname + `/../images/${req.file.originalname}`;
        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(path);
        return sendResponse(req, res, {"imageUrl": path}, true, 200, "", "image uploaded");
   } catch (err) {
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
   }
}

exports.buyProduct = async(req, res, next)=>{
    try{
        if(req.user.role != util.role.user) return sendResponse(req, res, {}, true, 401, "", "user is not user");

        const {productId, qty} = req.body;
        const getProduct = await productService.findById(productId);
        if(!getProduct) return sendResponse(req, res, {}, false, 404, "no such product found", "no such product found");

        if(getProduct.qty<qty)return sendResponse(req, res, {}, false, 404, "product is out of stock", "product is out of stock");

        getProduct.qty -=qty;


        let amount = getProduct.amount*qty;
        const getUser = await userService.findByEmail(req.user.email);
        getUser.bought.push({product:productId, qty:qty, amount:amount, soldBy: getProduct.soldBy});

        const putData = await userService.updateById(getUser);

        const getShopkeeper = await shopkeeperService.findById(getProduct.soldBy);
        if(getShopkeeper){
            getShopkeeper.sold.push({qty:qty, amount:amount, boughtBy:getUser._id, product:productId});
            shopkeeperService.updateById(getShopkeeper);
        }
        // update product count 
        await productService.updateById(getProduct);
        return sendResponse(req, res, putData, true, 200, "", "product bought");

    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}