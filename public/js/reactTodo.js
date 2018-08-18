(() => {
  const todos = [
    {id: 0, title: 'Task 0', isDone: false},
    {id: 1, title: 'Task 1', isDone: false},
    {id: 2, title: 'Task 2', isDone: false},
  ];

  function TodoItem(props) {
    return (
      <li>{props.todo.title}</li>
    );
  }

  function TodoList(props) {
    const todos = props.todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      );
    });
    return (
      <ul>
        {todos}
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

    render() {
      return (
        <div>
          <h1>My Todos</h1>
          <TodoList todos={this.state.todos}/>
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
})();
