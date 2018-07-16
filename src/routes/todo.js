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
    .fetch()
    .then(todos => {
      renderParams.todos = todos;
      res.status(renderParams.statusCode).render('todo.ejs', renderParams);
    })
    .catch(error => {
      console.log(error);
      // TODO
    });
});

router.put('/', (req, res) => {
  const todo = new Todo(connection);
  todo
    .updateState(req.body.id)
    .then(() => todo.find(req.body.id))
    .then(todoState => {
      res.json(todoState);
    })
    .catch(error => {
      console.log(error);
      // TODO
    });
});

module.exports = router;
