const { Schema } = require("../db");
const mongoose = require("../db");
const {util} = require("../../utils/config");

const { SchemaTypes, SchemaType } = require("mongoose");

const productSchema = new Schema({
	name: { type: SchemaTypes.String, required: true },
    status:{ type: SchemaTypes.Number, default:util.categories.active },
    productImage:{type:SchemaTypes.String, required: true},
    categoryId:{ type: SchemaTypes.ObjectId,required:true, ref: "categories"},
    qty:{type: SchemaTypes.Number, default:0},
    amount:{type: SchemaTypes.Number,required:true},
    description:{ type: SchemaTypes.String, required: true},
    soldBy:{ type: SchemaTypes.ObjectId,required:true, ref: "shopkeepers"}
},{
    timestamps:true
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;