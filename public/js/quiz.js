(() => {
  const answerList = document.getElementsByClassName('answer');

  /**
   * 正解を取得する
   *
   * @returns {Promise<void>}
   */
  const fetchAnswer = async () => {
    try {
      const request = {
        method: 'post'
      };
      const response = await fetch('/quiz', request);

      // TODO ステータスが200以外だった場合の処理を追加

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
    const selectedAnswer = selected.textContent;

    if (answer === selectedAnswer) {
      selected.textContent = `${selectedAnswer} ... CORRECT!`;
    } else {
      selected.textContent = `${selectedAnswer} ... WRONG!`;
    }
  };

  /**
   * クイズの選択肢が押された時の挙動
   *
   * @param selected
   */
  const handleAnswerBtnClick = async selected => {
    try {
      const answer = await fetchAnswer();

      displayJudgement(answer.correctAnswer, selected);
    } catch (error) {
      // TODO エラー処理を追加
    }
  };

  const answerLength = answerList.length;
  for (let i = 0; i < answerLength; i += 1) {
    answerList[i].addEventListener('click', async e => {
      await handleAnswerBtnClick(e.target);
    });
  }
})();
