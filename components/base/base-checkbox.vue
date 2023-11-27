<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "base-checkbox",
  props:['value']
})
</script>

<template>
  <input type="checkbox" :checked="value"
         v-bind:value="value"
         v-on:input="$emit('input', $event.target.value)">
</template>

<style scoped>

</style>
