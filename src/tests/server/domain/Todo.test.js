const assert = require('power-assert');
const Todo = require('../../../server/domain/Todo');
const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME
});

describe('Todo', () => {

  before(() => {
    const todoData = JSON.parse(fs.readFileSync(`${__dirname}/todoData.json`));
    const todoDataLength = todoData.todo.length;

    for (let i = 0; i <todoDataLength; i += 1){
        const sql = 'INSERT INTO todos SET ?';
        const post = {
          id: todoData.todo[i].id,
          state: todoData.todo[i].state,
          title: todoData.todo[i].title,
          lock_version: todoData.todo[i].lock_version,
          created_at: todoData.todo[i].created_at,
          updated_at: todoData.todo[i].updated_at,
        };

        connection.query(sql, post, error => {
          if (error) {
            console.log(error);
          }
        });
      }
  });

  it('should be able to fetch Todos from Mysql', async () => {
    const todo = new Todo(connection);

    const response = await todo.fetch().catch((error) => {
      // このブロックに入るという事はテストが意図した通りに動いていない
      // エラー内容を出力しテストを失敗させる
      console.error(error);

      assert.fail(error);
    });

    const todosLength = response.length;

    // todoが存在して、3件であること
    assert.strictEqual(
      todosLength,
      3,
      'todoが存在して、3件であること',
    );

    // 1件のデータに id state url が存在すること
    for (let i = 0; i < todosLength; i += 1) {
      assert.ok(response[i].id);
      assert.ok(String(response[i].state));
      assert.ok(response[i].title);
    }
  });

  /**
   * Todo.validateTitle() でfalseが返るパターンの検証
   * バリデーションを通過しないケース
   */
  it('should return false when the userId is empty', () => {
    const isValidUserId = Todo.validateTitle('');
    assert.strictEqual(isValidUserId, false, 'バリデーションエラーとなることを確認する');
  });

  /**
   * Todo.validateTitle() でtrueが返るパターンの検証
   * バリデーションを通過するケース
   */
  it('should return false when the userId is not empty', () => {
    const testValues = [
      'todo title',
      'タイトル',
    ];

    testValues.map(value => assert.strictEqual(
      Todo.validateTitle(value),
      true,
      `${value} を渡した結果がtrueである事を確認する。`,
    ));
  });

  /**
   * Todo.validateId() でfalseが返るパターンの検証
   * バリデーションを通過しないケース
   */
  it('should return false because the id is out of the rule', () => {
    const testValues = [
      0,
      1.1,
      -1,
      'a',
      '',
      '<script></script>',
    ];

    testValues.map(value => assert.strictEqual(
      Todo.validateId(value),
      false,
      `${value} を渡した結果がfalseである事を確認する。`,
    ));
  });

  /**
   * Todo.validateId() でtrueが返るパターンの検証
   * バリデーションを通過するケース
   */
  it('should return true because the id is within the scope of the rule', () => {
    const testValues = [
      1,
      '1',
    ];

    testValues.map(value => assert.strictEqual(
      Todo.validateId(value),
      true,
      `${value} を渡した結果がtrueである事を確認する。`,
    ));
  });

  after(() => {
    connection.query('TRUNCATE TABLE todos', error => {
      if (error) {
        console.log(error);
      }
    });
    connection.destroy();
  });
});
