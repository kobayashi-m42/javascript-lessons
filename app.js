const express = require('express');
const ejs = require('ejs');

const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype !== 'image/gif' &&
    file.mimetype !== 'image/jpeg' &&
    file.mimetype !== 'image/png'
  ) {
    return cb(new Error('PNG/JPEG/GIF only!'));
  }
  return cb(null, true);
};

const upload = multer({
  dest: './images/',
  limits: { fileSize: 1048576 },
  fileFilter
}).single('image');

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
      res.status(500).send(err.message);
    } else if (!req.file) {
      res.status(500).send('Upload Error!');
    } else {
      console.log(
        `uploaded ${req.file.originalname} as ${req.file.filename} Size: ${
          req.file.size
        }`
      );
    }
  });
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
