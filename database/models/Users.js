const { Schema } = require("../db");
const mongoose = require("../db");
const {util} = require("../../utils/config");

const { SchemaTypes, SchemaType } = require("mongoose");

const userSchema = new Schema({
	email: { type: SchemaTypes.String, required: true },
	password: { type: SchemaTypes.String, required: true },
    cart:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "products" },
            status:{type:SchemaTypes.Number, default:util.cartProduct.active},
            addTime:{type: Date, default: Date.now}
        }
    ],
    favorite:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "products" },
            status:{type:SchemaTypes.Number, default:util.cartProduct.active},
            addTime:{type: Date, default: Date.now}
        }
    ],
    bought:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "products" },
            qty:{type:SchemaTypes.Number, required:true},
            amount:{type:SchemaTypes.Number},
            addTime:{type: Date, default: Date.now},
            soldBy:{type: SchemaTypes.ObjectId, ref: "shopkeepers"} 
        }
    ]
},{
    timestamps:true
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;