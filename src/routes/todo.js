const express = require('express');
require('dotenv').config();

const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

connection.end();

router.get('/', (req, res) => {
  res.render('todo.ejs');
});

module.exports = router;
