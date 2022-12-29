const sharp = require("sharp");
const { sendResponse } = require("../utils/response");
const userService = require("../database/services/userService");
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
        
        return sendResponse(req, res, {accessToken : createJwtToken({email:email, role:util.role.shopkeeper})}, true, 200, "", "Login Successfull");
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