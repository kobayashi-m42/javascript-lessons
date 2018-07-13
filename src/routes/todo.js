const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('todo.ejs');
});

module.exports = router;
