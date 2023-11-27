<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "base-block"
})
</script>

<template>
  <div class="base-block">
    <slot/>
  </div>
</template>

<style scoped>
.base-block {
  border-radius: 24px;
  background: #FFF;
  padding: 32px;
}
</style>
