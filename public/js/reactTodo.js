(() => {
  const todos = [
    {id: 0, title: 'Task 0', isDone: false},
    {id: 1, title: 'Task 1', isDone: false},
    {id: 2, title: 'Task 2', isDone: false},
  ];

  function TodoItem(props) {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={props.todo.isDone}
            onChange={() => props.onChange(props.todo)}
          />
          <span className={props.todo.isDone ? 'done' : ''}>
            {props.todo.title}
          </span>
        </label>
        <span
          className="command"
          onClick={() => props.onClick(props.todo)}
        >
          [X]
        </span>
      </li>
    );
  }

  function TodoList(props) {
    const todos = props.todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onChange={props.onChange}
          onClick={props.onClick}
        />
      );
    });
    return (
      <ul>
        {props.todos.length ? todos : <li>Nothing to do!</li>}
      </ul>
    );
  }

  class App extends React.Component {
    constructor(){
      super();
      this.state = {
        todos: todos,
      }
    }

    handleChange(todo) {
      const todos = this.state.todos.slice();
      const position = this.state.todos.indexOf(todo);

      todos[position].isDone = !todos[position].isDone;
      this.setState ({
        todos: todos
      });
    }

    handleClickDeleteButton(todo) {
      if(!confirm('are you sure?')) {
        return;
      }

      const todos = this.state.todos.slice();
      const position = this.state.todos.indexOf(todo);

      todos.splice(position, 1);
      this.setState ({
        todos: todos
      });
    }

    render() {
      return (
        <div className="container">
          <h1>My Todos</h1>
          <TodoList
            todos={this.state.todos}
            onChange={(todo) => this.handleChange(todo)}
            onClick={(todo) => this.handleClickDeleteButton(todo)}
          />
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
})();
