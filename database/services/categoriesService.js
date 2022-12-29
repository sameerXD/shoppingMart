const CollectionService = require("../models/Categories");

exports.findByCustomId= async(id)=>{
        let getData = await CollectionService.findOne({"id":id});
        return getData;
}

exports.findById= async(id)=>{
    let getData = await CollectionService.findById(id);
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