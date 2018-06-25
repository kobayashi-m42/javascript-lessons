const express = require('express');
const ejs = require('ejs');

const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './images/' }).single('image');

const path = require('path');
const Calender = require('./src/server/domain/Calender.js');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/imageUploader', (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log("Failed to write " + req.file.destination + " with " + err);
    } else {
      console.log("uploaded " + req.file.originalname + " as " + req.file.filename + " Size: " + req.file.size);
    }
  });
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
