new Vue({
  el: '#app',
  data: {
    item: '',
    todos: []
  },
  methods: {
    addItem: function () {
      if(this.item.trim() === '') {
        return;
      }
      const item = {
        id: this.generateUniqueId(),

        title: this.item,
        isDone: false
      };
      this.item = '';
      this.todos.push(item);
    },
    deleteItem: function (index) {
      if (!confirm('are you sure?')) {
        return;
      }
      this.todos.splice(index, 1);
    },
    purge: function () {
      if (!confirm('are you sure?')) {
        return;
      }
      this.todos = this.remaining;
    },
    generateUniqueId: function () {
      return `${new Date().getTime().toString(36)}-${Math.random().toString(36)}`
    }
  },
  computed: {
    remaining: function () {
      return this.todos.filter(function (todo) {
        return !todo.isDone;
      });
    }
  }
});
