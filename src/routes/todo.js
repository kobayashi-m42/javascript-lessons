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

router.post('/', (req, res) => {
  const todo = new Todo(connection);
  const errorResponse = {
    errorCode: '',
    message: ''
  };

  const isValid = Todo.validateTitle(req.body.title);
  if (!isValid) {
    errorResponse.errorCode = 422;
    errorResponse.message = 'Unprocessable Entity';
    res.status(422).json(errorResponse);
    return;
  }

  todo
    .createTodo(req.body.title)
    .then(insertId => todo.find(insertId))
    .then(todoItem => {
      res.json({ todoItem });
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
    .then(todoItem => {
      res.json({ state: todoItem.state });
    })
    .catch(error => {
      console.log(error);
      // TODO
    });
});

router.delete('/', (req, res) => {
  const todo = new Todo(connection);
  todo
    .deleteTodo(req.body.id)
    .then(() => {
      res.status(200).send();
    })
    .catch(error => {
      console.log(error);
      // TODO
    });
});
module.exports = router;
