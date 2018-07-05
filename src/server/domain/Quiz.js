class Quiz {
  constructor() {
    this.setupQuiz();
  }

  /**
   * クイズのデータをセットアップする
   */
  setupQuiz() {
    this.quizSet = [
      { question: 'What is A?', answer: ['A0', 'A1', 'A2', 'A3'] },
      { question: 'What is B?', answer: ['B0', 'B1', 'B2', 'B3'] },
      { question: 'What is C?', answer: ['C0', 'C1', 'C2', 'C3'] }
    ];
  }

  /**
   * 現在のクイズを取得する
   *
   * @param targetQuizNumber
   * @returns {*}
   */
  retrieveCurrentQuiz(targetQuizNumber) {
    const targetQuiz = this.quizSet[targetQuizNumber];
    const answerLength = targetQuiz.answer.length;

    for (let i = answerLength - 1; i >= 0; i -= 1) {
      const rand = Math.floor(Math.random() * (i + 1));
      [targetQuiz.answer[i], targetQuiz.answer[rand]] = [
        targetQuiz.answer[rand],
        targetQuiz.answer[i]
      ];
    }

    return targetQuiz;
  }

  /**
   * クイズの正解を取得する
   *
   * @param targetQuizNumber
   * @returns {string}
   */
  retrieveAnswer(targetQuizNumber) {
    return this.quizSet[targetQuizNumber].answer[0];
  }

  /**
   * クイズが終了しているかどうか判定する
   *
   * @param targetQuizNumber
   * @returns {boolean}
   */
  isFinished(targetQuizNumber) {
    return targetQuizNumber === this.quizSet.length;
  }

  /**
   * 最後のクイズかどうかを判定する
   *
   * @param targetQuizNumber int
   * @returns {boolean}
   */
  isLast(targetQuizNumber) {
    return targetQuizNumber + 1 === this.quizSet.length;
  }

  /**
   * 正解率を計算する
   *
   * @param correctScore
   * @returns {number}
   */
  calculateScore(correctScore) {
    return Math.round(correctScore / this.quizSet.length * 100);
  }

  /**
   * 選択された回答が正解かどうか判定する
   *
   * @param targetQuizNumber
   * @param selectedAnswer
   * @returns {boolean}
   */
  isCorrect(targetQuizNumber, selectedAnswer) {
    return this.quizSet[targetQuizNumber].answer[0] === selectedAnswer;
  }
}

module.exports = Quiz;
