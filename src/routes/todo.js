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
    errorResponse: {},
    statusCode: 200,
    csrfToken: req.csrfToken()
  };
  const todo = new Todo(connection);
  todo
    .fetch()
    .then(todos => {
      renderParams.todos = todos;
      res.status(renderParams.statusCode).render('todo.ejs', renderParams);
    })
    .catch(() => {
      renderParams.statusCode = 500;
      renderParams.errorResponse = 'Internal Server Error';

      res.status(renderParams.statusCode).render('error.ejs', renderParams);
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
    res.status(errorResponse.errorCode).json(errorResponse);
    return;
  }

  todo
    .createTodo(req.body.title)
    .then(insertId => todo.find(insertId))
    .then(todoItem => {
      res.json({ todoItem });
    })
    .catch(() => {
      errorResponse.errorCode = 500;
      errorResponse.message = 'Internal Server Error';
      res.status(errorResponse.errorCode).json(errorResponse);
    });
});

router.put('/', (req, res) => {
  const todo = new Todo(connection);
  const errorResponse = {
    errorCode: '',
    message: ''
  };

  const isValid = Todo.validateId(req.body.id);
  if (!isValid) {
    errorResponse.errorCode = 422;
    errorResponse.message = 'Unprocessable Entity';
    res.status(errorResponse.errorCode).json(errorResponse);
    return;
  }

  todo
    .updateState(req.body.id)
    .then(() => todo.find(req.body.id))
    .then(todoItem => {
      res.json({ state: todoItem.state });
    })
    .catch(() => {
      errorResponse.errorCode = 500;
      errorResponse.message = 'Internal Server Error';
      res.status(errorResponse.errorCode).json(errorResponse);
    });
});

router.delete('/', (req, res) => {
  const todo = new Todo(connection);
  const errorResponse = {
    errorCode: '',
    message: ''
  };

  const isValid = Todo.validateId(req.body.id);
  if (!isValid) {
    errorResponse.errorCode = 422;
    errorResponse.message = 'Unprocessable Entity';
    res.status(errorResponse.errorCode).json(errorResponse);
    return;
  }

  todo
    .deleteTodo(req.body.id)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      errorResponse.errorCode = 500;
      errorResponse.message = 'Internal Server Error';
      res.status(errorResponse.errorCode).json(errorResponse);
    });
});
module.exports = router;
