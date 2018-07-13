const express = require('express');
require('dotenv').config();

const router = express.Router();

const mysql = require('mysql');

const Todo = require('../../src/server/domain/Todo.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get('/', (req, res) => {
  const todo = new Todo(connection);
  todo
    .fetchTodos()
    .then(response => {
      console.log(response);

    })
    .catch(error => {
      console.log(error);
    });

  connection.end();
  res.render('todo.ejs');
});

module.exports = router;
