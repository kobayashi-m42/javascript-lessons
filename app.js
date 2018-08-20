const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const express = require('express');
const ejs = require('ejs');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const port = 3000;
const calender = require('./src/routes/calender');
const imageUploader = require('./src/routes/imageUploader');
const quiz = require('./src/routes/quiz');
const reactQuiz = require('./src/routes/reactQuiz');
const todo = require('./src/routes/todo');
const poll = require('./src/routes/poll');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000 // 30min.
    }
  })
);

app.set('views', `${__dirname}/src/views`);
app.engine('ejs', ejs.renderFile);

app.use('/public', express.static('public'));

app.use('/imageUploader', imageUploader);
app.use('/calender', calender);
app.use('/poll', poll);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/bingo', (req, res) => {
  res.sendFile(path.join(`${__dirname}/src/views`, 'bingo.html'));
});

app.get('/reactTodo', (req, res) => {
  res.sendFile(path.join(`${__dirname}/src/views`, 'reactTodo.html'));
});

app.get('/reactQuiz', (req, res) => {
  res.sendFile(path.join(`${__dirname}/src/views`, 'reactQuiz.html'));
});

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use((err, req, res, next) => {
  console.log(err.code);
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  const errorResponse = {
    errorCode: '403',
    message: '不正なリクエストです。'
  };
  return res.status(errorResponse.errorCode).json(errorResponse);
});

app.use('/quiz', quiz);
app.use('/todo', todo);
app.use('/api/reactQuiz', reactQuiz);

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
