const express = require('express');
require('dotenv').config();

const router = express.Router();

const mysql = require('mysql');

const Poll = require('../../src/server/domain/Poll.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.POLL_DB_USER,
  password: process.env.POLL_DB_PASSWORD,
  database: process.env.POLL_DB_NAME
});

router.get('/', (req, res) => {
  res.render('poll.ejs');
});

router.post('/', (req, res) => {
  const poll = new Poll(connection);
  poll
    .saveAnswer(req.body.answer)
    .then(() => {})
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
