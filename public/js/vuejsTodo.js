new Vue({
  el: '#app',
  data: {
    todos: [
      { id: 0, title: 'Task 0', isDone: false },
      { id: 1, title: 'Task 1', isDone: false },
      { id: 2, title: 'Task 2', isDone: true }
    ]
  },
  methods: {
    deleteItem: function (index) {
      if (!confirm('are you sure?')) {
        return;
      }
      this.todos.splice(index, 1);
    }
  }
});
