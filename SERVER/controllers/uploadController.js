const model= require('../models/uploadModel')

async function createFile(fileUrl,tutor_id) {
    try {
        return model.createFile(fileUrl,tutor_id);
    } catch (err) {
        throw err;
    }
}




module.exports = { createFile}