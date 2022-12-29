const bcrypt = require("bcrypt");
const {util} = require("../utils/config");
const { createJwtToken } = require("../utils/jwtFunctions");
const { sendResponse } = require("../utils/response");
const categoriesService = require("../database/services/categoriesService");


exports.adminLogin = async (req, res, next)=>{
    try{
        let email = req.body.email;
        if(email){
            email = email.toLowerCase();
        }

        const myPlaintextPassword = req.body.password;
        if (email.localeCompare(util.security.adminEmail)!=0 ||!bcrypt.compareSync(myPlaintextPassword, util.security.adminPassword)) return sendResponse(req, res, {}, false, 401, "wrong email or password", "wrong email or password");
        
        return sendResponse(req, res, {accessToken : createJwtToken({email:email, role:util.role.admin})}, true, 200, "", "Login Successfull");
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}

exports.addCategories = async (req, res, next)=>{
    try{
        let name = req.body.name;
        let categoryImage=req.body.categoryImage;
        console.log(categoryImage + "000000");
        const postData = await categoriesService.create({name, categoryImage});
        
        sendResponse(req, res, postData, true, 200, "", "category posted")
    }catch(err){
        console.log(err);
        sendResponse(req, res, {}, false, 500, ""+err, "Internal Server Error");
    }
}