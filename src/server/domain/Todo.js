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
  fetch() {
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
   * TODOを取得する
   *
   * @param id
   */
  find(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM todos WHERE id = ?';
      const options = [id];

      this.connection.query(sql, options, (err, results) => {
        if (err) return reject(err);

        const response = {
          id: results[0].id,
          state: results[0].state,
          title: results[0].title
        };

        return resolve(response);
      });
    });
  }

  /**
   * TODOを登録する
   *
   * @param title
   */
  createTodo(title) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO todos SET ?';
      const post = {
        state: 0,
        title
      };

      this.connection.query(sql, post, (err, results) => {
        if (err) return reject(err);

        return resolve(results.insertId);
      });
    });
  }

  /**
   * TODOのステータスを更新する
   *
   * @param id
   */
  updateState(id) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE todos SET state = (state + 1) % 2 WHERE id = ?';
      const options = [id];

      this.connection.query(sql, options, err => {
        if (err) return reject(err);

        return resolve();
      });
    });
  }

  /**
   * TODOを削除する
   *
   * @param id
   */
  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM todos WHERE id = ?';
      const options = [id];

      this.connection.query(sql, options, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
    });
  }

  /**
   * titleパラメータのバリデーションチェックを行なう
   *
   * @param title
   * @returns {boolean}
   */
  static validateTitle(title) {
    if (title === '') {
      return false;
    }

    return true;
  }
}

module.exports = Todo;
