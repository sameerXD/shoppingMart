const sendResponse = (req, res, data, success, statusCode, err, message)=>{
    res.status(statusCode).send({"data":data, "status":success, "error":err, "message":message});
}

module.exports = {
    sendResponse
}