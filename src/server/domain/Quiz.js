class quiz {
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
    return this.quizSet[targetQuizNumber];
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
}

module.exports = quiz;
