<template>
  <div class="panel">
    <div class="panel-header">
      Notes
    </div>

    <div class="panel-body">
      <textarea
        v-model="notes"
        class="notes-textarea"
        placeholder="Write something..."
        @input="saveNotes"
      />
    </div>

    <div class="status-bar">
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'yume-notes'

const notes = ref('')
const status = ref('Ready')

let saveTimeout: number

function saveNotes() {
  status.value = 'Saving...'

  clearTimeout(saveTimeout)

  saveTimeout = window.setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, notes.value)

    status.value = 'Saved'
  }, 500)
}

onMounted(() => {
  const savedNotes = localStorage.getItem(STORAGE_KEY)

  if (savedNotes) {
    notes.value = savedNotes
  }
})
</script>

<style scoped>
.panel {
  background: #d4d0c8;

  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
}

.panel-header {
  background: #4f6fcf;
  color: white;

  padding: 4px 8px;

  font-family: Tahoma, sans-serif;
  font-size: 13px;
  font-weight: bold;
}

.panel-body {
  padding: 6px;
}

.notes-textarea {
  width: 100%;
  min-height: 180px;

  resize: vertical;

  padding: 6px;

  background: white;

  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;

  font-family: Tahoma, sans-serif;
  font-size: 12px;

  outline: none;

  box-sizing: border-box;
}

.status-bar {
  padding: 4px 8px;

  background: #d4d0c8;

  border-top: 1px solid #808080;

  font-family: Tahoma, sans-serif;
  font-size: 11px;

  color: #444;
}
</style>