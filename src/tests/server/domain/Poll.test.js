const assert = require('power-assert');
const Poll = require('../../../server/domain/Poll');
const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.POLL_TEST_DB_USER,
  password: process.env.POLL_TEST_DB_PASSWORD,
  database: process.env.POLL_TEST_DB_NAMEPOLL
});

describe('Todo', () => {
  /**
   * Poll.validateAnswer() でfalseが返るパターンの検証
   * バリデーションを通過しないケース
   */
  it('should return false because the answer is out of the rule', () => {
    const testValues = [
      1.1,
      -1,
      3,
      'a',
      '',
      '<script></script>',
    ];

    testValues.map(value => assert.strictEqual(
      Poll.validateAnswer(value),
      false,
      `${value} を渡した結果がfalseである事を確認する。`,
    ));
  });

  /**
   * Poll.validateAnswer() でtrueが返るパターンの検証
   * バリデーションを通過するケース
   */
  it('should return true because the answer is within the scope of the rule', () => {
    const testValues = [
      '0',
      '1',
      '2',
    ];

    testValues.map(value => assert.strictEqual(
      Poll.validateAnswer(value),
      true,
      `${value} を渡した結果がtrueである事を確認する。`,
    ));
  });
});
