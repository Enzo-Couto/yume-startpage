<template>
  <div class="panel">
    <div class="panel-header">
      Internet
    </div>

    <div class="panel-body">
      <label class="search-label">
        Search the web:
      </label>

      <form
        :action="searchEngine"
        method="GET"
        class="search-form"
      >
        <input
          type="text"
          name="q"
          placeholder=""
          autocomplete="off"
        />

        <button type="submit">
          Search
        </button>
      </form>

      <div class="engines">
        <label>
          <input
            type="radio"
            value="https://duckduckgo.com/"
            v-model="searchEngine"
          />
          DuckDuckGo
        </label>

        <label>
          <input
            type="radio"
            value="https://www.google.com/search"
            v-model="searchEngine"
          />
          Google
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchEngine = ref('https://duckduckgo.com/')
</script>

<style scoped>
.panel {
  background: #d4d0c8;
  margin-bottom: 8px;
}

.panel-header {
  background: #4f6fcf;
  color: white;
  padding: 4px 8px;
  font-size: 13px;
  font-weight: bold;
}

.panel-body {
  padding: 8px;
  font-family: Tahoma, sans-serif;
  font-size: 12px;
}

.search-label {
  display: block;
  margin-bottom: 6px;
}

.search-form {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.search-form input[type="text"] {
  flex: 1;
  padding: 3px 5px;

  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;

  background: white;
  font-family: Tahoma, sans-serif;
}

.search-form button {
  padding: 3px 12px;

  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;

  background: #d4d0c8;
  cursor: pointer;

  font-family: Tahoma, sans-serif;
}

.search-form button:active {
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.engines {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.engines label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.engines input[type="radio"] {
  margin: 0;
}
</style>