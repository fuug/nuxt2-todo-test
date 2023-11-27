<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "tasks-general-actions",
  computed: {
    filter() {
      return this.$store.state.filter
    },
    isShowCheckAll() {
      return this.$store.getters.inProcessCount > 0
    },
    isShowRemoveChecked() {
      return this.$store.getters.completedCount > 0
    },
  },
  methods: {
    setFilter(newFilter: 'all' | 'in-process' | 'completed') {
      this.$store.commit('setFilter', newFilter);
    },
    clear() {
      this.$store.commit('removeChecked')
    },
    checkAll() {
      this.$store.commit('checkAll')
    },
  },
})
</script>

<template>
  <v-row class="general-actions__container">
    <v-btn v-if="isShowCheckAll" class="general-actions__btn" elevation="0" @click="checkAll">Check all</v-btn>
    <v-btn class="general-actions__btn" elevation="0" :class="{solid: filter === 'all'}" @click="() => setFilter('all')">All</v-btn>
    <v-btn v-if="isShowCheckAll && isShowRemoveChecked" class="general-actions__btn" elevation="0" :class="{solid: filter === 'in-process'}" @click="() => setFilter('in-process')">Active</v-btn>
    <v-btn v-if="isShowCheckAll && isShowRemoveChecked" class="general-actions__btn" elevation="0" :class="{solid: filter === 'completed'}" @click="() => setFilter('completed')">Completed</v-btn>
    <v-btn v-if="isShowRemoveChecked" class="general-actions__btn" elevation="0" @click="clear">Clear completed</v-btn>
  </v-row>
</template>

<style scoped>
.general-actions__container.row {
  max-width: 430px;
  margin: 32px auto 0;
  flex-wrap: nowrap;
}

.v-btn.general-actions__btn {
  padding: 8px;
  border-radius: 8px;
  font-size: 13px;
  text-transform: none;
  font-weight: 600;
  background-color: transparent;
  min-width: 0;
}

.v-btn.general-actions__btn.solid {
  background-color: #2578F4;
  color: #fff;
}
</style>
