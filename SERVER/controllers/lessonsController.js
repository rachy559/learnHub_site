const model = require('../models/lessonsModel');

async function getAllLenguages(){
    try{
        return model.getLenguages();
    }catch(err){
        throw err;
    }
}
module.exports={ getAllLenguages};