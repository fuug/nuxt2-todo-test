<template>
  <v-row class="main-wrapper">
    <base-block class="main-block">
      <div class="block-top">
        <div class="img-container">
          <img src="~/assets/img/logo.svg"/>
        </div>
        <p class="text-h5 title">Today I need to</p>
        <add-new-form/>
      </div>
      <div v-if="isShowList" class="block-bottom">

        <task-list class="task-list"/>
        <tasks-statistic class="task-list__container"/>
        <tasks-general-actions/>
      </div>
      <div v-else class="block-bottom">
        <p class="message">
          <icon-checkmark/>
          <span>Congrat, you have no more tasks to do</span>
        </p>
      </div>
    </base-block>
  </v-row>
</template>

<script>
import IconCheckmark from "~/components/icons/icon-checkmark.vue";

export default {
  name: 'IndexPage',
  components: {IconCheckmark},
  computed: {
    isShowList() {
      return this.$store.state.list.length > 0
    }
  }
}
</script>

<style scoped>
.main-wrapper {
  align-items: center;
  justify-content: center;
}

.main-block {
  width: 50%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}

.main-block::-webkit-scrollbar {
  display: none;
}

.row {
  margin: 0;
}

.img-container {
  text-align: center;
  margin-bottom: 48px;
}

.title {
  text-align: center;
}

.block-bottom {
  height: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-list, .task-list__container {
  width: 100%;
  max-width: 410px;
  margin: 0 auto;
}
.task-list {
  max-width: 426px;
}

.message {
  color: #8F99A3;
  margin: auto auto 0;
  text-align: center;
  display: flex;
  align-items: center;
}

.message span {
  margin-left: 8px;
}
</style>
