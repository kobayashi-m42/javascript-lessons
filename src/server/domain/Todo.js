/**
 * TODOデータを扱うクラス
 */
class Todo {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * token からデータを取得する
   *
   * @returns {Promise<any>}
   */
  fetchTodos() {
    return new Promise((resolve, reject) => {
      const $sql = 'SELECT * FROM todos ORDER BY id DESC';

      this.connection.query($sql, (err, results) => {
        if (err) return reject(err);

        const responseArray = [];

        results.map(todo =>
          responseArray.push({
            state: todo.state,
            title: todo.title
          })
        );

        return resolve(responseArray);
      });
    });
  }
}

module.exports = Todo;
