(() => {
  const checkList = document.getElementsByClassName('js-check-todo');
  const closeButtonList = document.getElementsByClassName('js-close-todo');
  const newTodoButton = document.getElementById('js-new-todo-btn');
  const newTodo = document.getElementById('js-new-todo');
  const errorMessage = document.getElementById('js-error-message');

  newTodo.focus();

  /**
   * HTTPのErrorが発生した際に利用する
   */
  class HttpError extends Error {
    /**
     * @param body
     * @param status
     */
    constructor(body, status) {
      super(body.message);

      this.name = this.constructor.name;

      Error.captureStackTrace(this, this.constructor);

      this.status = status || 500;
      this.body = body;
    }
  }

  /**
   * TODOを登録する
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

      if (response.status !== 200) {
        const responseBody = await response.json();

        return Promise.reject(new HttpError(responseBody, response.status));
      }

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
   * TODOをHTMLのTODOリスの先頭に追加する
   *
   * @param todo
   */
  const insertBeforeTodoHtml = todo => {
    const todosEmelent = document.getElementById('jd-todos');
    const firstTodoList = todosEmelent.firstChild;

    const todoList = document
      .getElementById('js-todo-template')
      .cloneNode(true);
    todoList.id = todo.todoItem.id;
    todoList.dataset.id = todo.todoItem.id;
    todoList.style = '';
    todoList.querySelector('span').textContent = todo.todoItem.title;

    todosEmelent.insertBefore(todoList, firstTodoList);
    return todoList;
  };

  /**
   * エラーを表示する
   *
   * @param errorBody
   */
  const displayErrorHtml = errorBody => {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = `${errorBody.errorCode} ${errorBody.message}`;
  };

  /**
   * TODOのチェックが押された時の挙動
   *
   * @param checked
   */
  const handleChecked = async checked => {
    try {
      errorMessage.style.display = 'none';

      const todoId = checked.parentNode.dataset.id;
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
    try {
      errorMessage.style.display = 'none';
      const todoId = closed.parentNode.dataset.id;
      await deleteTodo(todoId);
      closeTodoHtml(closed.parentNode);
    } catch (e) {
      // TODO エラー処理を追加
    }
  };

  /**
   * 追加されたTODOにイベントを追加する
   *
   * @param todoList
   */
  const addEventList = todoList => {
    todoList
      .getElementsByClassName('js-check-todo')[0]
      .addEventListener('click', async e => {
        await handleChecked(e.target);
      });
    todoList
      .getElementsByClassName('js-close-todo')[0]
      .addEventListener('click', async e => {
        await handleClosed(e.currentTarget);
      });
  };

  /**
   * TODOの追加ボタンが押された時の挙動
   */
  const handleNewTodoBtn = async () => {
    try {
      errorMessage.style.display = 'none';

      if (!newTodo.checkValidity()) {
        return;
      }

      const newTodoValue = newTodo.value;
      const todo = await createTodo(newTodoValue);
      const todoList = insertBeforeTodoHtml(todo);
      addEventList(todoList);

      newTodo.value = '';
      newTodo.focus();
    } catch (error) {
      if (error.name === 'HttpError') {
        displayErrorHtml(error.body);
        return;
      }

      const errorBody = {
        errorCode: 500,
        message: 'Internal Server Error'
      };
      displayErrorHtml(errorBody);
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
