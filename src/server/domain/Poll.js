/**
 * Pollデータを扱うクラス
 */
class Poll {
  /**
   * constructor
   * @param connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * 投票結果を保存する
   *
   * @param answer
   */
  saveAnswer(answer) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO answers SET ?';
      const post = {
        answer
      };

      this.connection.query(sql, post, err => {
        if (err) return reject(err);

        return resolve();
      });
    });
  }
}

module.exports = Poll;
