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
  const renderParams = {
    errorResponse: {},
    statusCode: 200
  };

  res.render('poll.ejs', renderParams);
});

router.post('/', (req, res) => {
  const renderParams = {
    errorResponse: {},
    statusCode: ''
  };

  const poll = new Poll(connection);
  const isValid = Poll.validateAnswer(req.body.answer);

  if (!isValid) {
    renderParams.statusCode = 422;
    renderParams.errorResponse = 'Unprocessable Entity';

    res.status(renderParams.statusCode).render('poll.ejs', renderParams);
    return;
  }

  poll
    .saveAnswer(req.body.answer)
    .then(() => {})
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
