const { Schema } = require("../db");
const mongoose = require("../db");
const {util} = require("../../utils/config");

const { SchemaTypes, SchemaType } = require("mongoose");

const categoriesSchema = new Schema({
	name: { type: SchemaTypes.String, required: true },
    status:{ type: SchemaTypes.Number, default:util.categories.active },
    categoryImage:{type:SchemaTypes.String, required: true}
},{
    timestamps:true
});

const CategoryModel = mongoose.model("category", categoriesSchema);
module.exports = CategoryModel;