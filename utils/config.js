require("dotenv").config()

exports.util = {
    cartProduct:{
        active:0,
        deleted:1
    },
    categories:{
        active:0,
        deleted:1
    },
    security:{
        saltRounds:10,
        adminEmail:process.env.ADMIN_EMAIL,
        adminPassword:process.env.ADMIN_PASSWORD,
        jwtSecretKey:process.env.JWT_SECRET_KEY,
        jwtExpiresIn: process.env.JWT_EXPIRY
    },
    role:{
        admin:0,
        anonymousUser:1,
        shopkeeper:2
    }
}