<template>
  <div class="panel">
    <div class="panel-header">
      ♥ Favorites
    </div>

    <div class="panel-body">
      <a
        v-for="favorite in favorites"
        :key="favorite.name"
        :href="favorite.url"
        class="favorite-item"
      >
        <span>{{ favorite.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
const favorites = [
  {
    name: "ChatGPT",
    url: "https://chatgpt.com"
  },
  {
    name: "YouTube",
    url: "https://youtube.com"
  },
  {
    name: "GitHub",
    url: "https://github.com"
  },
  {
    name: "RuneScape",
    url: "https://www.runescape.com"
  },
  {
    name: "FiveM",
    url: "https://fivem.net"
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com"
  }
]
</script>

<style scoped>
.panel {
  background: #d4d0c8;
  margin-top: 8px;
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
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 4px 6px;

  color: black;
  text-decoration: none;

  font-family: Tahoma, sans-serif;
  font-size: 13px;
}

.favorite-item:hover {
  background: #0a246a;
  color: white;
}

.icon {
  width: 20px;
  text-align: center;
}
</style>