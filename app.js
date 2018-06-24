const express = require('express');
const ejs = require('ejs');

const app = express();
const path = require('path');
const Calender = require('./src/Calender.js');

const port = 3000;

app.set('views', `${__dirname}/src/views`);
app.engine('ejs', ejs.renderFile);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('sample.ejs', { message: 'Hello there!' });
});

app.get('/bingo', (req, res) => {
  res.sendFile(path.join(__dirname, 'bingo.html'));
});

app.get('/calender', (req, res) => {
  const targetDate = Calender.generateTargetDate(req.query.date);
  const calenderObj = Calender.generateCalender(targetDate);

  const renderParams = {
    calender: calenderObj,
    targetDate
  };

  res.render('calender.ejs', renderParams);
});

app.get('/imageUploader', (req, res) => {
  res.sendFile(path.join(__dirname, 'imageUploader.html'));
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
