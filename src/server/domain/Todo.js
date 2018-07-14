/**
 * TODOデータを扱うクラス
 */
class Todo {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * todos からデータを取得する
   *
   * @returns {Promise<any>}
   */
  fetchTodos() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM todos ORDER BY id DESC';

      this.connection.query(sql, (err, results) => {
        if (err) return reject(err);

        const responseArray = [];

        results.map(todo =>
          responseArray.push({
            id: todo.id,
            state: todo.state,
            title: todo.title
          })
        );

        return resolve(responseArray);
      });
    });
  }

  /**
   * TODOのステータスを更新する
   *
   * @param id
   */
  updateTodo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE todos SET state = (state + 1) % 2 WHERE id = ?';
      const options = [id];

      this.connection.query(sql, options, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
    });
  }

  /**
   * TODOを取得する
   *
   * @param id
   */
  findTodo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM todos WHERE id = ?';
      const options = [id];

      this.connection.query(sql, options, (err, results) => {
        if (err) return reject(err);

        const response = { state: results[0].state };

        return resolve(response);
      });
    });
  }
}

module.exports = Todo;
