const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('poll.ejs');
});

router.post('/', (req, res) => {
  console.log(req.body.answer);
});

module.exports = router;
