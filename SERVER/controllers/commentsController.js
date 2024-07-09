const model = require('../models/commentsModel');
const bcrypt = require('bcrypt');

async function getAllComments(){
    try{
        return model.getComments();
    }catch(err){
        console.log(err);
        throw err;
    }
}

async function createComment(comment_date, body, student_id){
    try{
        return model.createNewComment(comment_date, body, student_id);
    }catch(err){
        console.log(err);
        throw err;
    }
}


module.exports={getAllComments, createComment};