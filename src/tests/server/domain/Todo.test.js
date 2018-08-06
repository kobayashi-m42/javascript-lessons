const assert = require('power-assert');
const Todo = require('../../../server/domain/Todo');
const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.TODO_TEST_DB_USER,
  password: process.env.TODO_TEST_DB_PASSWORD,
  database: process.env.TODO_TEST_DB_NAME
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

    // 1件のデータに id state title が存在すること
    for (let i = 0; i < todosLength; i += 1) {
      assert.ok(response[i].id);
      assert.ok(String(response[i].state));
      assert.ok(response[i].title);
    }
  });

  it('should find todo', async () => {
    const todo = new Todo(connection);
    const findTodoId = 3;

    const response = await todo.find(findTodoId).catch((error) => {
      // このブロックに入るという事はテストが意図した通りに動いていない
      // エラー内容を出力しテストを失敗させる
      console.error(error);

      assert.fail(error);
    });

    assert.strictEqual(
      response.id,
      3,
      'idが意図した値である事を確認する',
    );

    assert.strictEqual(
      response.state,
      0,
      'stateが意図した値である事を確認する',
    );

    assert.strictEqual(
      response.title,
      'TODO title 3',
      'titleが意図した値である事を確認する',
    );
  });

  it('should create todo', async () => {
    const todo = new Todo(connection);

    await todo.createTodo('TODO title 4').catch((error) => {
      // このブロックに入るという事はテストが意図した通りに動いていない
      // エラー内容を出力しテストを失敗させる
      console.error(error);

      assert.fail(error);
    });

    const sql = 'SELECT * FROM todos ORDER BY id DESC';
    connection.query(sql, (err, results) => {
      if (err) {
        // このブロックに入るという事はテストが意図した通りに動いていない
        // エラー内容を出力しテストを失敗させる
        console.error(error);

        assert.fail(error);
      }

      assert.strictEqual(
        results.length,
        4,
        'todoが存在して、4件であること',
      );

      assert.strictEqual(
        results[0].id,
        4,
        'idが意図した値である事を確認する',
      );

      assert.strictEqual(
        results[0].state,
        0,
        'stateが意図した値である事を確認する',
      );

      assert.strictEqual(
        results[0].title,
        'TODO title 4',
        'titleが意図した値である事を確認する',
      );
    });
  });

  it('should update todo state to 1', async () => {
    const todo = new Todo(connection);
    const updateTodoId = 1;

    await todo.updateState(updateTodoId).catch((error) => {
      // このブロックに入るという事はテストが意図した通りに動いていない
      // エラー内容を出力しテストを失敗させる
      console.error(error);

      assert.fail(error);
    });

    const sql = `SELECT * FROM todos WHERE id = ${updateTodoId}`;
    connection.query(sql, (err, results) => {
      if (err) {
        // このブロックに入るという事はテストが意図した通りに動いていない
        // エラー内容を出力しテストを失敗させる
        console.error(error);

        assert.fail(error);
      }

      assert.strictEqual(
        results[0].state,
        1,
        'idが意図した値である事を確認する',
      );
    });
  });

  it('should delete todo', async () => {
    const todo = new Todo(connection);
    const deleteTodoId = 3;

    await todo.deleteTodo(deleteTodoId).catch((error) => {
      // このブロックに入るという事はテストが意図した通りに動いていない
      // エラー内容を出力しテストを失敗させる
      console.error(error);

      assert.fail(error);
    });

    const sql = `SELECT * FROM todos WHERE id = ${deleteTodoId}`;
    connection.query(sql, (err, results) => {
      if (err) {
        // このブロックに入るという事はテストが意図した通りに動いていない
        // エラー内容を出力しテストを失敗させる
        console.error(error);

        assert.fail(error);
      }

      assert.strictEqual(
        results.length,
        0,
        'todoが存在しないこと',
      );
    });
  });

  it('should update todo state to 0', async () => {
    const todo = new Todo(connection);
    const updateTodoId = 2;

    await todo.updateState(updateTodoId).catch((error) => {
      // このブロックに入るという事はテストが意図した通りに動いていない
      // エラー内容を出力しテストを失敗させる
      console.error(error);

      assert.fail(error);
    });

    const sql = `SELECT * FROM todos WHERE id = ${updateTodoId}`;
    connection.query(sql, (err, results) => {
      if (err) {
        // このブロックに入るという事はテストが意図した通りに動いていない
        // エラー内容を出力しテストを失敗させる
        console.error(error);

        assert.fail(error);
      }

      assert.strictEqual(
        results[0].state,
        0,
        'idが意図した値である事を確認する',
      );
    });
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
