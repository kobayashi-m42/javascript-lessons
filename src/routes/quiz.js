const express = require('express');

const router = express.Router();

const Quiz = require('../../src/server/domain/Quiz.js');

router.get('/', (req, res) => {
  if (req.session.currentNumber === undefined) {
    req.session.currentNumber = 0;
  }

  const quiz = new Quiz();
  const targetQuizNumber = req.session.currentNumber;
  const isFinished = quiz.isFinished(targetQuizNumber);
  const isLast = quiz.isLast(targetQuizNumber);

  const renderParams = {
    quiz: '',
    isFinished,
    isLast
  };

  if (isFinished) {
    req.session.currentNumber = 0;
  } else {
    renderParams.quiz = quiz.retrieveCurrentQuiz(targetQuizNumber);
  }

  res.render('quiz.ejs', renderParams);
});

router.post('/', (req, res) => {
  const quiz = new Quiz();

  // TODO sessionにcurrentNumberが含まれていなかった場合エラー

  const targetQuizNumber = req.session.currentNumber;
  req.session.currentNumber += 1;

  const answer = { correctAnswer: quiz.retrieveAnswer(targetQuizNumber) };
  res.json(answer);
});

module.exports = router;
