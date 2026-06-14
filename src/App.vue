<template>
  <div class="desktop">
    <WindowFrame>
      <TopBar />
      <div class="content">
        <div class="left">
          <NotesPanel />
          <FavoritesPanel />
        </div>

        <div class="center">
          <SearchPanel />
          <WidgetsPanel />
        </div>

        <div class="right">
          <NewsPanel />
        </div>
      </div>

      <div class="bottom">
        <SpotifyPanel />
      </div>
    </WindowFrame>
  </div>
</template>

<script setup lang="ts">
import WindowFrame from './components/WindowFrame.vue'
import TopBar from './components/TopBar.vue'

import SpotifyPanel from './components/SpotifyPanel.vue'
import NotesPanel from './components/NotesPanel.vue'
import FavoritesPanel from './components/FavoritesPanel.vue'

import SearchPanel from './components/SearchPanel.vue'
import WidgetsPanel from './components/WidgetsPanel.vue'

import NewsPanel from './components/NewsPanel.vue'

import { onMounted } from 'vue'
import { handleSpotifyCallback } from './services/spotify'

onMounted(async () => {
  try {
    await handleSpotifyCallback()
  } catch (error) {
    console.error('Spotify callback error:', error)
  }
})
</script>

<style scoped>
.desktop {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;

  background-image: url('./assets/wallpaper.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.content {
  display: grid;

  /*
    Esquerda | Centro | Direita
  */
  grid-template-columns: 280px 1fr 320px;

  gap: 12px;

  align-items: start;
}

.left,
.center,
.right {
  display: flex;
  flex-direction: column;

  gap: 12px;

  min-width: 0;
}

.center {
  min-width: 420px;
}

.bottom {
  margin-top: 12px;
}

/* Responsividade */
@media (max-width: 1100px) {
  .content {
    grid-template-columns: 1fr;
  }

  .center {
    min-width: auto;
  }
}
</style>