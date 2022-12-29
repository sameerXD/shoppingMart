const { Schema } = require("../db");
const mongoose = require("../db");
const {util} = require("../../utils/config");

const { SchemaTypes, SchemaType } = require("mongoose");

const sessionUserSchema = new Schema({
	uid: { type: SchemaTypes.String, required: true },
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
    ]
},{
    timestamps:true
});

const SessionUserModel = mongoose.model("sessionUser", sessionUserSchema);
module.exports = SessionUserModel;