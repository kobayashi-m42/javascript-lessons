(() => {
  const question = document.getElementById('question');
  const answers = document.querySelectorAll('#answers > li');
  const nextBtn = document.getElementById('btn');
  const answersLength = answers.length;

  const quizSet = [
    { question: 'What is A?', answer: ['A0', 'A1', 'A2'] },
    { question: 'What is B?', answer: ['B0', 'B1', 'B2'] },
    { question: 'What is C?', answer: ['C0', 'C1', 'C2'] }
  ];

  let currentNumber = 0;
  let isAnswered = false;

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
    for (let i = 0; i < answersLength; i += 1) {
      answers[i].classList.remove('correct');
      answers[i].classList.remove('wrong');
    }
    isAnswered = false;
    nextBtn.classList.add('disabled');

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
    nextBtn.classList.remove('disabled');
    if (isAnswered === true) {
      return;
    }
    isAnswered = true;
    const displayForAnswer = selectedAnswer;
    if (displayForAnswer.textContent === quizSet[currentNumber].answer[0]) {
      displayForAnswer.classList.add('correct');
      displayForAnswer.textContent += ' ... Correct!';
    } else {
      displayForAnswer.classList.add('wrong');
      displayForAnswer.textContent += ' ... Wrong!';
    }
  };

  const createSelectAnswerEvent = () => {
    for (let i = 0; i < answersLength; i += 1) {
      answers[i].addEventListener('click', () => {
        judgeQuiz(answers[i]);
      });
    }
  };

  nextBtn.addEventListener('click', () => {
    if (nextBtn.classList.contains('disabled')) {
      return;
    }
    currentNumber += 1;
    initQuiz();
  });

  initQuiz();
  createSelectAnswerEvent();
})();
