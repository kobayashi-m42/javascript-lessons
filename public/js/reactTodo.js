(() => {
  const todos = [];

  function TodoHeader(props) {
    const remaining = props.todos.filter(todo => {
      return !todo.isDone;
    });

    return (
      <h1>
        My Todos
        <span>({remaining.length}/{props.todos.length})</span>
      </h1>
    );
  }

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

  function TodoForm(props) {
    return (
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          value={props.item}
          onChange={props.onChange}
        />
        <input type="submit" value="Add"/>
      </form>
    );

  }

  function generateUniqueId() {
    return `${new Date().getTime().toString(36)}-${Math.random().toString(36)}`
  }

  class App extends React.Component {
    constructor(){
      super();
      this.state = {
        todos: todos,
        item: '',
      }
    }

    handleChangeCheck(todo) {
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

    handleChangeItem(e){
      this.setState({
        item: e.target.value
      });
    }

    handleSubmitAdd(e){
      e.preventDefault();

      if(this.state.item.trim() === '') {
        return;
      }

      const item = {
        id: generateUniqueId(),
        title: this.state.item,
        isDone: false
      };

      const todos = this.state.todos.slice();
      todos.push(item);
      this.setState({
        todos: todos,
        item: '',
      });
    }

    render() {
      return (
        <div className="container">
          <TodoHeader
            todos={this.state.todos}
          />
          <TodoList
            todos={this.state.todos}
            onChange={todo => this.handleChangeCheck(todo)}
            onClick={todo => this.handleClickDeleteButton(todo)}
          />
          <TodoForm
            item={this.state.item}
            onChange={e => this.handleChangeItem(e)}
            onSubmit={e => this.handleSubmitAdd(e)}
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
