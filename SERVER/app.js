const express = require('express');
const path = require('path');
const app = express();
const {authenticateToken, authenticateAdmin} = require('./middlewares/authMiddleware')
app.use (express.json());
app.use(express.urlencoded({ extended: true }));
// const jwt=require('jsonwebtoken');
require('dotenv').config();

const PORTRUN = process.env.PORTRUN || 3000;

 const homePage=require('./routes/homePageRoute');
 app.use('/',homePage);

 const tutors=require('./routes/tutorsRoute');
//  app.use('/tutors',authenticateToken, authenticateAdmin, tutors);
 app.use('/tutors', tutors);


 const login=require('./routes/loginRoute');
 app.use('/login',login);

 const users=require('./routes/usersRoute');
 app.use('/users',users);

 const students=require('./routes/studentsRoute');
 app.use('/students',students);


 const upload=require('./routes/uploadRoute');
 app.use('/upload',upload);

 const lessons=require('./routes/lessonsRoute');
 app.use('/lessons',lessons);

//  const manager=require('./routes/managerRoute');
//  app.use('/manager_homePage',manager);

 const filter=require('./routes/filterRoute');
 app.use('/filter',filter);


app.listen(PORTRUN, () => {
    console.log(`App listening on port ${PORTRUN}`);
  });

