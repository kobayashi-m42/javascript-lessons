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
app.use('/quiz', quiz);

app.get('/', (req, res) => {
  res.render('sample.ejs', { message: 'Hello there!' });
});

app.get('/bingo', (req, res) => {
  res.sendFile(path.join(__dirname, 'bingo.html'));
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
