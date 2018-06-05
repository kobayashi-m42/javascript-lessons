(() => {
  const question = document.getElementById('question');
  const answers = document.querySelectorAll('#answers > li');
  const nextBtn = document.getElementById('nextBtn');

  const quizSet = [
    { question: 'What is A?', answer: ['A0', 'A1', 'A2'] },
    { question: 'What is B?', answer: ['B0', 'B1', 'B2'] },
    { question: 'What is C?', answer: ['C0', 'C1', 'C2'] }
  ];

  const currentNumber = 0;

  const shuffleAnswers = arr => {
    let i;
    let j;
    let tmp;

    const shuffledAnswers = arr;

    for (i = arr.length - 1; i >= 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = shuffledAnswers[i];
      shuffledAnswers[i] = shuffledAnswers[j];
      shuffledAnswers[j] = tmp;
    }
    return shuffledAnswers;
  };

  const initQuiz = () => {
    question.textContent = quizSet[currentNumber].question;
    const shuffledAnswers = shuffleAnswers(
      quizSet[currentNumber].answer.slice()
    );
    [
      answers[0].textContent,
      answers[1].textContent,
      answers[2].textContent
    ] = shuffledAnswers;
  };

  const judgeQuiz = selectedAnswer => {
    const displayForAnswer = selectedAnswer;
    if (displayForAnswer.textContent === quizSet[currentNumber].answer[0]) {
      displayForAnswer.classList.add('correct');
      displayForAnswer.textContent += ' ... Correct!';
    } else {
      displayForAnswer.classList.add('wrong');
      displayForAnswer.textContent += ' ... Wrong!';
    }
  };

  const createSelectAnswer = () => {
    const AnswersLength = answers.length;
    for (let i = 0; i < AnswersLength; i += 1) {
      answers[i].addEventListener('click', () => {
        judgeQuiz(answers[i]);
      });
    }
  };

  initQuiz();
  createSelectAnswer();
})();
