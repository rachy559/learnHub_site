const express = require('express');
const path = require('path');
const app = express();
const { authenticateToken, authorizeRoll } = require('./middlewares/authMiddleware')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const PORTRUN = process.env.PORTRUN || 3000;
console.log(process.env.ACCESS_TOKEN_SECRET)
const imagesPath = path.join(__dirname, 'public/images');
app.use('/images', express.static(imagesPath));
const comments = require('./routes/commentsRoute');
const tutors = require('./routes/tutorsRoute');
const lanSub = require('./routes/lanSubRoute');
const login = require('./routes/loginRoute');
const studentLesson = require('./routes/studentLessonRoute');
const users = require('./routes/usersRoute');
const students = require('./routes/studentsRoute');
const upload = require('./routes/uploadRoute');
const lessons = require('./routes/lessonsRoute');
const filter = require('./routes/filterRoute');
//  const refreshToken=require('./routes/rereshTokenRoute');
const emailRoute = require('./routes/emailRoute');

app.use('/tutors', tutors);
app.use('/', comments);
app.use('/comments', comments);
app.use('/lanSub', lanSub);
app.use('/login', login);
app.use('/studentLesson', studentLesson);
app.use('/users', users);
app.use('/students', students);
app.use('/upload', upload);
app.use('/lessons', lessons);
app.use('/filter', filter);
//  app.use('/refreshToken',refreshToken);
app.use('/send-email', emailRoute);


app.use(authenticateToken);
app.use('/auth', (req, res) => {
  res.json(req.user);
})

const calendar = require('./routes/calendarRoute');
const manager = require('./routes/managerRoute');

app.use('/manager', authorizeRoll('MANAGER'), manager);
app.use('/calendar', authorizeRoll('STUDENT'), calendar);



app.listen(PORTRUN, () => {
  console.log(`App listening on port ${PORTRUN}`);
});
