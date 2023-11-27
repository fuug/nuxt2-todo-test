<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "tasks-statistic",
  computed: {
    completed() {
      return this.$store.getters.completedCount
    },
    inProcess() {
      return this.$store.getters.inProcessCount
    },
    completedBarWidth() {
      const all = this.$store.getters.inProcessCount + this.$store.getters.completedCount;
      return ((this.$store.getters.completedCount ?? 0) * 100) / all + '%'
    },
    inProcessBarWidth() {
      const all = this.$store.getters.inProcessCount + this.$store.getters.completedCount;
      return ((this.$store.getters.inProcessCount ?? 0) * 100) / all + '%'
    }
  }
})
</script>

<template>
  <div class="tasks-statistic">
    <div class="tasks-statistic__item">
      <p class="count">{{ completed }} tasks</p>
      <p class="title">Completed</p>
      <div class="bar">
        <div class="bar__solid __completed"></div>
      </div>
    </div>
    <div class="tasks-statistic__item">
      <p class="count">{{ inProcess }} tasks</p>
      <p class="title">To be finished</p>
      <div class="bar">
        <div class="bar__solid __in-process"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  background-color: rgba(32, 36, 39, 0.07);
  border-radius: 8px;
  height: 4px;
  width: 100%;
  position: relative;
}

.bar__solid {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 8px;
  transition: width .35s;
}

.bar__solid.__completed {
  background-color: #5D5FEF;
  width: v-bind(completedBarWidth);
}

.bar__solid.__in-process {
  background-color: #EF5DA8;
  width: v-bind(inProcessBarWidth);
}

.tasks-statistic {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 30px;
}

.tasks-statistic__item {
  background: rgba(32, 36, 39, 0.05);
  border-radius: 8px;
  padding: 16px;
}

.count {
  color: #202427;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.5;
  margin-bottom: 4px;
}

.title {
  color: #202427;
  font-size: 14px;
  font-weight: 700;
}
</style>
