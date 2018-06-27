const express = require('express');
const ejs = require('ejs');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

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

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images/');
  },
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(
        null,
        raw.toString('hex') + Date.now() + path.extname(file.originalname)
      );
    });
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1048576 },
  fileFilter
}).single('image');

const port = 3000;
const Calender = require('./src/server/domain/Calender.js');
const ImageUploader = require('./src/server/domain/ImageUploader.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', `${__dirname}/src/views`);
app.engine('ejs', ejs.renderFile);

app.use('/public', express.static('public'));
app.use('/images', express.static('images'));
app.use('/thumbs', express.static('thumbs'));

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
  const renderParams = {
    images: ImageUploader.getImages(),
    successMessage: '',
    errorMessage: ''
  };
  res.render('imageUploader.ejs', renderParams);
});

app.post('/imageUploader', (req, res) => {
  upload(req, res, err => {
    if (err) {
      const renderParams = {
        images: ImageUploader.getImages(),
        successMessage: '',
        errorMessage: err.message
      };
      res.render('imageUploader.ejs', renderParams);
    } else if (!req.file) {
      const renderParams = {
        images: ImageUploader.getImages(),
        successMessage: '',
        errorMessage: 'Upload Error!'
      };
      res.render('imageUploader.ejs', renderParams);
    } else {
      ImageUploader.createThumbnail(req.file);

      const renderParams = {
        images: ImageUploader.getImages(),
        successMessage: 'Upload Done!',
        errorMessage: ''
      };
      res.render('imageUploader.ejs', renderParams);
    }
  });
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
