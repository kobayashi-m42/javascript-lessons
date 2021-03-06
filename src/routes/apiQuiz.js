const express = require('express');

const router = express.Router();

const Quiz = require('../../src/server/domain/Quiz.js');

router.get('/', (req, res) => {
  if (req.session.currentNumber === undefined) {
    req.session.currentNumber = 0;
  }
  if (req.session.correctCount === undefined) {
    req.session.correctCount = 0;
  }

  const quiz = new Quiz();
  const targetQuizNumber = req.session.currentNumber;
  const isFinished = quiz.isFinished(targetQuizNumber);
  const isLast = quiz.isLast(targetQuizNumber);

  const response = {
    currentQuiz: '',
    isFinished,
    isLast,
    score: quiz.calculateScore(req.session.correctCount),
    csrfToken: req.csrfToken()
  };

  if (isFinished) {
    req.session.currentNumber = 0;
    req.session.correctCount = 0;
  } else {
    response.currentQuiz = quiz.retrieveCurrentQuiz(targetQuizNumber);
  }

  res.json(response);
});

router.post('/', (req, res) => {
  const quiz = new Quiz();
  const selectedAnswer = req.body.selectedAnswer;

  if (!selectedAnswer) {
    const errorResponse = {
      errorCode: '422',
      message: 'Unprocessable Entity'
    };
    res.status(422).json(errorResponse);
    return;
  }

  const targetQuizNumber = req.session.currentNumber;
  if (quiz.isCorrect(targetQuizNumber, selectedAnswer)) {
    req.session.correctCount += 1;
  }

  req.session.currentNumber += 1;

  const answer = { correctAnswer: quiz.retrieveAnswer(targetQuizNumber) };
  res.json(answer);
});
module.exports = router;
