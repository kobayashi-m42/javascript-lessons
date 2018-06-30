const express = require('express');

const router = express.Router();
const path = require('path');

const ImageUploader = require('../../src/server/domain/ImageUploader.js');

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

router.get('/', (req, res) => {
  const renderParams = {
    images: ImageUploader.getImages(),
    successMessage: '',
    errorMessage: ''
  };
  res.render('imageUploader.ejs', renderParams);
});

router.post('/', (req, res) => {
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

module.exports = router;
