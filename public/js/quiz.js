(() => {
  const answerList = document.getElementsByClassName('answer');
  const nextQuestion = document.getElementById('btn');
  const answerLength = answerList.length;
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

  /**
   * HTTPのErrorが発生した際に利用する
   */
  class HttpError extends Error {
    /**
     * @param body
     * @param status
     */
    constructor(body, status) {
      super(body.message);

      this.name = this.constructor.name;

      Error.captureStackTrace(this, this.constructor);

      this.status = status || 500;
      this.body = body;
    }
  }

  /**
   * 正解を取得する
   *
   * @param selectedAnswer
   * @returns {Promise<*>}
   */
  const fetchAnswer = async selectedAnswer => {
    try {
      const request = {
        method: 'post',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'CSRF-Token': csrfToken
        },
        body: `selectedAnswer=${selectedAnswer}`
      };
      const response = await fetch('/quiz', request);

      if (response.status !== 200) {
        const responseBody = await response.json();

        return Promise.reject(new HttpError(responseBody, response.status));
      }

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * クイズの結果を画面に表示する
   *
   * @param answer
   * @param selected
   */
  const displayJudgement = (answer, selected) => {
    for (let i = 0; i < answerLength; i += 1) {
      if (answerList[i].textContent === answer) {
        answerList[i].classList.add('correct');
      } else {
        answerList[i].classList.add('wrong');
      }
    }

    const selectedList = selected;
    const selectedAnswer = selected.textContent;

    if (answer === selectedAnswer) {
      selectedList.textContent = `${selectedAnswer} ... CORRECT!`;
    } else {
      selectedList.textContent = `${selectedAnswer} ... WRONG!`;
    }
  };

  /**
   * エラーを表示する
   *
   * @param errorBody
   */
  const displayErrorHtml = errorBody => {
    const errorMessage = document.getElementById('js-error-message');
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = `${errorBody.errorCode} ${errorBody.message}`;

    nextQuestion.style.display = 'none';
  };

  /**
   * クイズの選択肢が押された時の挙動
   *
   * @param selected
   */
  const handleAnswerBtnClick = async selected => {
    if (
      selected.classList.contains('correct') ||
      selected.classList.contains('wrong')
    ) {
      return;
    }
    try {
      selected.classList.add('selected');
      nextQuestion.classList.remove('disabled');

      const answer = await fetchAnswer(selected.textContent);

      displayJudgement(answer.correctAnswer, selected);
    } catch (error) {
      if (error.name === 'HttpError') {
        displayErrorHtml(error.body);
        return;
      }

      const errorBody = {
        errorCode: 500,
        message: 'Internal Server Error'
      };
      displayErrorHtml(errorBody);
    }
  };

  for (let i = 0; i < answerLength; i += 1) {
    answerList[i].addEventListener('click', async e => {
      await handleAnswerBtnClick(e.target);
    });
  }

  nextQuestion.addEventListener('click', () => {
    if (nextQuestion.classList.contains('disabled')) {
      return;
    }
    window.location.reload();
  });
})();
