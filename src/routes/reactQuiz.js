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

  const currentQuiz = quiz.retrieveCurrentQuiz(targetQuizNumber);
  res.json(currentQuiz);
});

router.post('/', (req, res) => {
  const quiz = new Quiz();

  const targetQuizNumber = req.session.currentNumber;
  if (quiz.isCorrect(targetQuizNumber, req.body.selectedAnswer)) {
    req.session.correctCount += 1;
  }

  req.session.currentNumber += 1;

  const answer = { correctAnswer: quiz.retrieveAnswer(targetQuizNumber) };
  res.json(answer);
});
module.exports = router;
