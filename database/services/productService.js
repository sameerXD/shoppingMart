const CollectionService = require("../models/Products");

exports.findByEmail= async(email)=>{
        let getData = await CollectionService.findOne({"email":email});
        return getData;
}

exports.findById= async(id)=>{
    let getData = await CollectionService.findById(id);
    return getData;
}

exports.findByCategoryId= async(categoryId)=>{
    let getData = await CollectionService.find({categoryId:categoryId});
    return getData;
}

exports.findAll= async(pageNo)=>{
    let perPage = 10;
    pageNo--;
    let getData = await CollectionService.find({}).limit(perPage).skip(pageNo*perPage);
    return getData;
}
exports.create = async(data)=>{
        let postData = await CollectionService.create(data);
        return postData;
   
}


exports.deleteById = async(id)=>{
    let delData = await CollectionService.deleteOne({_id:id});
    return delData;
}

exports.updateById = async(data)=>{
    let putData = await CollectionService.updateOne({_id: data._id}, data, {
        new:true
    })

    return putData;
}