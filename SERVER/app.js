const express = require('express');
const path = require('path');
const app = express();
app.use (express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

 const homePage=require('./routes/homePageRoute');
 app.use('/',homePage);

 const tutors=require('./routes/tutorsRoute');
 app.use('/tutors',tutors);

 const login=require('./routes/loginRoute');
 app.use('/login',login);

 const users=require('./routes/usersRoute');
 app.use('/users',users);



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

