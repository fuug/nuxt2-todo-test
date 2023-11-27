<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "add-new-form",
  data() {
    return {
      taskName: ''
    }
  },
  methods: {
    addTask() {
      if (this.taskName.trim().length > 0) {
        this.$store.commit('add', this.taskName)
        this.taskName = '';
      } else {
        console.warn('The task name cannot be empty')
      }
    },
  }
})
</script>

<template>
  <form class="new-task__form" :class="{'show-submit': taskName}" @submit.prevent="addTask">
    <input type="text" v-model="taskName" class="new-task__form-input">
    <v-btn color="#2578F4" height="auto" variant="elevated" class="new-task__btn" @click="addTask">Submit</v-btn>
  </form>
</template>

<style scoped>
.new-task__form.show-submit {
  width: 410px;
}

.new-task__form {
  width: 317px;
  margin: auto;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  transition: all .2s;
}

.new-task__form-input {
  border-radius: 8px;
  border: 1px solid #C7CCD1;
  padding: 12px;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  transition: all .2s;
  flex-shrink: 0;
}

.new-task__form.show-submit .new-task__form-input {
  flex-shrink: 1;
}

.new-task__btn {
  color: #fff;
  border-radius: 8px;
  margin-left: 16px;

}
</style>
