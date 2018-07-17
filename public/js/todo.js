(() => {
  const checkList = document.getElementsByClassName('js-check-todo');
  const closeButtonList = document.getElementsByClassName('js-close-todo');
  const newTodoButton = document.getElementById('js-new-todo-btn');

  /**
   * TODOを更新する
   *
   * @param todo
   * @returns {Promise<never>}
   */
  const createTodo = async todo => {
    try {
      const request = {
        method: 'post',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `title=${todo}`
      };

      const response = await fetch('/todo', request);

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * TODOを更新する
   *
   * @param id
   * @returns {Promise<never>}
   */
  const updateState = async id => {
    try {
      const request = {
        method: 'put',
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
   * TODOを削除する
   *
   * @param id
   * @returns {Promise<never>}
   */
  const deleteTodo = async id => {
    try {
      const request = {
        method: 'delete',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `id=${id}`
      };

      await fetch('/todo', request);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * TODOの状態に合わせてタイトルのスタイルを変更する
   *
   * @param checked
   * @param state
   */
  const updateStateHtml = (checked, state) => {
    if (state === 1) {
      checked.nextElementSibling.classList.add('done');
    } else {
      checked.nextElementSibling.classList.remove('done');
    }
  };

  /**
   * 削除されたTODOを非表示にする
   *
   * @param closedTodo
   */
  const closeTodoHtml = closedTodo => {
    const todo = closedTodo;
    todo.classList.add('close-todo');

    todo.addEventListener('transitionend', () => {
      todo.style.display = 'none';
    });
  };

  /**
   * TODOの追加ボタンが押された時の挙動
   */
  const handleNewTodoBtn = async () => {
    try {
      const newTodo = document.getElementById('js-new-todo').value;
      const todo = await createTodo(newTodo);
      console.log(todo);
    } catch (e) {
      // TODO エラー処理を追加
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
      const todo = await updateState(todoId);
      updateStateHtml(checked, todo.state);
    } catch (e) {
      // TODO エラー処理を追加
    }
  };

  /**
   * TODOの閉じるボタンが押された時の挙動
   *
   * @param closed
   */
  const handleClosed = async closed => {
    const todoId = closed.parentNode.dataset.id;
    try {
      await deleteTodo(todoId);
      closeTodoHtml(closed.parentNode);
    } catch (e) {
      // TODO エラー処理を追加
    }
  };

  const checkListLength = checkList.length;
  for (let i = 0; i < checkListLength; i += 1) {
    checkList[i].addEventListener('click', async e => {
      await handleChecked(e.target);
    });
  }

  const closeButtonListLength = closeButtonList.length;
  for (let i = 0; i < closeButtonListLength; i += 1) {
    closeButtonList[i].addEventListener('click', async e => {
      await handleClosed(e.currentTarget);
    });
  }

  newTodoButton.addEventListener('click', async () => {
    await handleNewTodoBtn();
  });
})();
