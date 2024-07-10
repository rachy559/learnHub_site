const model = require('../models/managerModel');

async function getManagerDetails(userId) {
    try {
        const response=await model.getManagerDetails(userId);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


module.exports={ getManagerDetails };