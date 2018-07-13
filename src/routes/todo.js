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
  const renderParams = {
    todos: [],
    statusCode: 200
  };
  const todo = new Todo(connection);
  todo
    .fetchTodos()
    .then(response => {
      renderParams.todos = response;
      res.status(renderParams.statusCode).render('todo.ejs', renderParams);
    })
    .catch(error => {
      console.log(error);
      // TODO
    });
  connection.end();
});

module.exports = router;
