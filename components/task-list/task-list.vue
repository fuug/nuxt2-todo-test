<script lang="ts">
import {defineComponent} from 'vue'
import draggable from 'vuedraggable'
import IconDrag from "~/components/icons/icon-drag.vue";
import TodoItem from "~/types/todo";
import IconTrash from "~/components/icons/icon-trash.vue";
import IconPencil from "~/components/icons/icon-pencil.vue";

export default defineComponent({
  name: "task-list",
  components: {IconPencil, IconTrash, IconDrag, draggable},
  computed: {
    todos: {
      get() {
        return this.$store.getters.list
      },
      set(list: { id: number, text: string, done: boolean }[]) {
        this.$store.commit('set', list)
      }
    }
  },
  data() {
    return {
      isDragging: false,
      dragOptions: {

        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },
  methods: {
    toggle(todoItem: TodoItem) {
      this.$store.commit('check', todoItem)
    },
    removeItem(todoItem: TodoItem) {
      this.$store.commit('remove', todoItem)
    },
    rename(todoItem: TodoItem, newText: string) {
      this.$store.commit('rename', {todoItem, newText})
    },
  },

})
</script>

<template>
  <draggable
    class="list-group"
    tag="ul"
    handle=".handle"
    v-model="todos"
    v-bind="dragOptions"
    @start="isDragging = true"
    @end="isDragging = false"
  >
    <transition-group type="transition" name="flip-list">
      <task-list-item v-for="element in todos" :key="element.id" :element="element" @removeItem="removeItem"
                      @rename="rename" @toggle="toggle"/>
    </transition-group>
  </draggable>
</template>

<style scoped>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  height: 16vh;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
}

.list-group::-webkit-scrollbar {
  width: 4px;
}

.list-group::-webkit-scrollbar-thumb {
  background-color: #2024271A;
  border-radius: 8px;
}

</style>
