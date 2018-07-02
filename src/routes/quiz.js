const express = require('express');

const router = express.Router();

const Quiz = require('../../src/server/domain/Quiz.js');

router.get('/', (req, res) => {
  const quiz = new Quiz();
  const currentQuiz = quiz.retrieveCurrentQuiz();

  const renderParams = {
    quiz: currentQuiz
  };

  res.render('quiz.ejs', renderParams);
});

module.exports = router;
