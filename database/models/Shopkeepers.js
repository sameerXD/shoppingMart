const { Schema } = require("../db");
const mongoose = require("../db");
const {util} = require("../../utils/config");

const { SchemaTypes, SchemaType } = require("mongoose");

const shopkeeperSchema = new Schema({
	email: { type: SchemaTypes.String, required: true },
	password: { type: SchemaTypes.String, required: true },
    products:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "products" },
            status:{type:SchemaTypes.Number, default:util.cartProduct.active},
            addTime:{type: Date, default: Date.now}
        }
    ],
    sold:[
        {
            product:{ type: SchemaTypes.ObjectId, ref: "products" },
            qty:{type:SchemaTypes.Number, required:true},
            amount:{type:SchemaTypes.Number},
            addTime:{type: Date, default: Date.now},
            boughtBy:{type: SchemaTypes.ObjectId, ref: "users"} 
        }
    ]
},{
    timestamps:true
});

const ShopKeeperModel = mongoose.model("shopkeeper", shopkeeperSchema);
module.exports = ShopKeeperModel;