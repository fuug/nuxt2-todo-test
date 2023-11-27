<script lang="ts">
import {defineComponent} from 'vue'
import IconDrag from "~/components/icons/icon-drag.vue";
import IconPencil from "~/components/icons/icon-pencil.vue";
import IconTrash from "~/components/icons/icon-trash.vue";

export default defineComponent({
  name: "task-list-item",
  components: {IconTrash, IconPencil, IconDrag},
  props: ['element'],
  emits: ['toggle', 'removeItem', 'rename'],
  data({$props}) {
    return {
      newText: $props.element.text,
      showEditInput: false,
    }
  },
  methods: {
    showEdit() {
      if (this.showEditInput) {
        if (this.newText.trim().length > 0) {
          this.$emit('rename', this.$props.element, this.newText)
        }
        this.showEditInput = false
      } else {
        this.showEditInput = true
      }
    },
  }
})
</script>

<template>
  <li class="list-group-item" :class="{checked: element.done}">
    <p class="list-group-item__content">
      <span class="handle"><icon-drag/></span>
      <base-checkbox v-bind:value="element.done" v-on:input="() => $emit('toggle', element)"/>
      <span v-show="!showEditInput" class="list-group-item__text">{{ element.text }}</span>
      <input v-show="showEditInput" type="text" class="list-group-item__text-input" v-model="newText">
    </p>
    <div class="list-group-item__actions">
      <v-btn @click="() => $emit('removeItem', element)" text icon density="compact" size="small">
        <icon-trash/>
      </v-btn>
      <v-btn @click="showEdit" text icon density="compact" size="small">
        <icon-pencil/>
      </v-btn>
    </div>
  </li>
</template>

<style scoped>
.list-group-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.list-group-item p {
  margin-bottom: 0;
}

.list-group-item .list-group-item__content {
  width: 100%;
}

.list-group-item .list-group-item__actions {
  flex-shrink: 0;
}

.list-group-item .handle {
  cursor: move;
  margin-right: 6px;
  opacity: 0;
  transition: opacity .2s;
}

.list-group-item:hover .handle {
  opacity: .5;
}

.list-group-item.checked .list-group-item__text {
  color: #202427;
  opacity: 0.5;
}

.list-group-item__text-input {
  border-radius: 8px;
  border: 1px solid #C7CCD1;
  padding: 0 6px;
}
</style>
