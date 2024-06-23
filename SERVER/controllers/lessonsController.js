const model = require('../models/lessonsModel');

async function getAllLenguages(){
    try{
        return await model.getLenguages();
    }catch(err){
        throw err;
    }
}
module.exports={ getAllLenguages};