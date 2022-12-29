const jwt = require("jsonwebtoken");
const { util } = require("./config");
const {sendResponse} = require('./response');

const createJwtToken = (data)=>{
    let jwtSecretKey = util.security.jwtSecretKey;
    let payload = {
        time: Date(),
        email:data.email,
        role :data.role,
        _id:data._id
    }

    const token = jwt.sign(payload, jwtSecretKey,{expiresIn:util.security.jwtExpiresIn});
    return token;
}

const verifyToken = (req, res, next)=>{
    try{

        let jwtSecretKey = util.security.jwtSecretKey;
        let token = req.get('token');
        if(!token) return sendResponse(req, res, {}, false, 401, 'token is missing', 'token is missing');
    
        const verified = jwt.verify(token, jwtSecretKey);
    
        if(verified){
            req.user = verified;
            next();
        }else{
            // Access Denied
            return sendResponse(req, res, {}, false, 401, 'token is invalid', 'token is invalid');
            }
    }catch(err){
        return sendResponse(req, res, {}, false, 401, 'token is invalid', 'token is invalid');
    }
}

module.exports = {
    createJwtToken,
    verifyToken
}