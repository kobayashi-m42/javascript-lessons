(() => {
  const checkList = document.getElementsByClassName('js-check-todo');
  const checkListLength = checkList.length;

  /**
   * TODOを更新する
   *
   * @param id
   * @returns {Promise<never>}
   */
  const updateTodo = async id => {
    try {
      const request = {
        method: 'post',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `id=${id}`
      };

      const response = await fetch('/todo', request);
      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * TODOのチェックが押された時の挙動
   *
   * @param checked
   */
  const handleChecked = async checked => {
    const todoId = checked.parentNode.dataset.id;
    try {
      const todo = await updateTodo(todoId);
    } catch (e) {
      // TODO エラー処理を追加
    }
  };

  for (let i = 0; i < checkListLength; i += 1) {
    checkList[i].addEventListener('click', async e => {
      await handleChecked(e.target);
    });
  }
})();
