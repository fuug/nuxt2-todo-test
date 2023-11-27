export const state = () => ({
  list: [],
  filter: 'all' // all | in-process | completed
})

export const getters = {
  list(state, getters) {
    switch (state.filter) {
      case "completed":
        return getters.completed;
      case "in-process":
        return getters.inProcess;
      default:
        return state.list;
    }
  },
  completed(state) {
    return state.list.filter(todoList => todoList.done)
  },
  inProcess(state) {
    return state.list.filter(todoList => !todoList.done)
  },
  completedCount(state, getters) {
    return getters.completed.length
  },
  inProcessCount(state, getters) {
    return getters.inProcess.length
  }
}

export const mutations = {
  add(state, text) {
    state.list.unshift({
      id: Math.ceil(Math.random() * 10000), text, done: false
    })
    this.$cookies.set('todo-list', state.list)
  },
  remove(state, todo) {
    state.list.splice(state.list.indexOf(todo), 1)
    this.$cookies.set('todo-list', state.list)
  },
  check(state, todo) {
    const todoToToggle = state.list.find(todoItem => todoItem.id === todo.id)
    if (todoToToggle) {
      todoToToggle.done = !todoToToggle.done
    }
    this.$cookies.set('todo-list', state.list)
  },
  checkAll(state) {
    state.list.forEach(todoListItem => (todoListItem.done = true))
    state.filter = 'all'
    this.$cookies.set('todo-list', state.list)
  },
  removeChecked(state) {
    state.list = state.list.filter(todoListItem => !todoListItem.done)
    state.filter = 'all'
    this.$cookies.set('todo-list', state.list)
  },
  rename(state, {todoItem, newText}) {
    const todoToToggle = state.list.find(todoListItem => todoListItem.id === todoItem.id)
    if (todoToToggle) {
      todoToToggle.text = newText
    }
    this.$cookies.set('todo-list', state.list)
  },
  set(state, todoList) {
    this.$cookies.set('todo-list', todoList)
    state.list = todoList;
  },
  saveFromCookie(state, todoList) {
    state.list = todoList;
  },
  setFilter(state, newFilter) {
    state.filter = newFilter;
  }
}

export const actions = {
  async nuxtServerInit({commit}) {
    const todoList = this.$cookies.get('todo-list')
    if (todoList) {
      commit('saveFromCookie', todoList)
    }
  }
}
