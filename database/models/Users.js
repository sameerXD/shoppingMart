const { Schema } = require("../db");
const mongoose = require("../db");
const {util} = require("../../utils/config");

const { SchemaTypes, SchemaType } = require("mongoose");

const userSchema = new Schema({
	email: { type: SchemaTypes.String, required: true },
	password: { type: SchemaTypes.String, required: true },
    cart:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "product" },
            status:{type:SchemaTypes.Number, default:util.cartProduct.active},
            addTime:{type: Date, default: Date.now}
        }
    ],
    favorite:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "product" },
            status:{type:SchemaTypes.Number, default:util.cartProduct.active},
            addTime:{type: Date, default: Date.now}
        }
    ],
    bought:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "product" },
            qty:{type:SchemaTypes.Number, required:true},
            amount:{type:SchemaTypes.Number},
            addTime:{type: Date, default: Date.now},
            soldBy:{type: SchemaTypes.ObjectId, ref: "shopkeeper"} 
        }
    ]
},{
    timestamps:true
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;