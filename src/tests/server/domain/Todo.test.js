const assert = require('power-assert');
const Todo = require('../../../server/domain/Todo');

describe('Todo', () => {
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
});
