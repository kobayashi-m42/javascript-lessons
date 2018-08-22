Vue.component('todo-item', {
  props: ['id','title','isDone', 'index'],
  template: `
    <li>
      <label>
        <input
          type="checkbox"
          v-model="childisChecked"
          v-on:change="updateCheck"
        />
        <span v-bind:class="{ done : isDone }">
          {{ title }}
        </span>
      </label>
      <span v-on:click="deleteItem" class="command">[X]</span>
     </li>
  `,
  data: function(){
    return {
      childisChecked: this.isDone,
    }
  },
  methods: {
    deleteItem: function(){
      this.$emit('delete', this.index);
    },
    updateCheck: function(){
      this.$emit('update', this.childisChecked, this.index);
    }

  }
});

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
    updateCheck: function(childChecked, childIndex){
      this.todos[childIndex].isDone = childChecked;
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
  },
  mounted: function () {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  },
  updated: function () {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
});
