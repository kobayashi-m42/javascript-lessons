const express = require('express');

const router = express.Router();

const Quiz = require('../../src/server/domain/Quiz.js');

router.get('/', (req, res) => {
  const quiz = new Quiz(req.session.currentNumber);

  if (req.session.currentNumber === undefined) {
    req.session.currentNumber = 0;
  }

  const targetQuizNumber = req.session.currentNumber;
  const currentQuiz = quiz.retrieveCurrentQuiz(targetQuizNumber);

  const renderParams = {
    quiz: currentQuiz
  };

  res.render('quiz.ejs', renderParams);
});

router.post('/', (req, res) => {
  const quiz = new Quiz(req.session.currentNumber);

  if (req.session.currentNumber === undefined) {
    req.session.currentNumber = 0;
  }

  const targetQuizNumber = req.session.currentNumber;

  const answer = { correctAnswer: quiz.retrieveAnswer(targetQuizNumber) };
  res.json(answer);
});

module.exports = router;
