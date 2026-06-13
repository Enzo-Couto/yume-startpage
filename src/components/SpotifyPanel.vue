<template>
  <div class="panel">
    <div class="panel-header">
      🎵 Now Playing
    </div>

    <div class="panel-body">
      <div class="spotify-content">
        <img
          :src="albumCover"
          alt="Album Cover"
          class="album-cover"
        />

        <div class="track-info">
          <div class="track-title">
            {{ trackTitle }}
          </div>

          <div class="track-artist">
            {{ artist }}
          </div>

          <div class="track-status">
            {{ connected ? 'Connected to Spotify' : 'Spotify not connected' }}
          </div>
        </div>
      </div>

      <div class="progress-container">
        <div
          class="progress-bar"
          :style="{ width: progress + '%' }"
        />
      </div>

      <div class="time-row">
        <span>{{ currentTime }}</span>
        <span>{{ totalTime }}</span>
      </div>

      <div class="controls">
        <button disabled>
          ⏮
        </button>

        <button disabled>
          ▶
        </button>

        <button disabled>
          ⏭
        </button>
      </div>

      <button
        class="connect-button"
        @click="connectSpotify"
      >
        {{ connected ? 'Reconnect Spotify' : 'Connect Spotify' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const connected = ref(false)

const albumCover = ref(
  'https://placehold.co/64x64?text=%E2%99%AA'
)

const trackTitle = ref('No music playing')
const artist = ref('Spotify')

const currentTime = ref('00:00')
const totalTime = ref('00:00')

const progress = ref(0)

function connectSpotify() {
  alert(
    'Spotify integration coming soon! 🎵'
  )
}
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
  padding: 8px;
}

.spotify-content {
  display: flex;
  gap: 10px;
}

.album-cover {
  width: 64px;
  height: 64px;

  object-fit: cover;

  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;

  background: white;
}

.track-info {
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-family: Tahoma, sans-serif;
}

.track-title {
  font-size: 13px;
  font-weight: bold;
}

.track-artist {
  font-size: 12px;
  color: #444;

  margin-top: 2px;
}

.track-status {
  margin-top: 6px;

  font-size: 11px;
  color: #666;
}

.progress-container {
  margin-top: 10px;

  height: 10px;

  background: white;

  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.progress-bar {
  height: 100%;

  background: #4f6fcf;

  width: 0%;
}

.time-row {
  margin-top: 4px;

  display: flex;
  justify-content: space-between;

  font-family: Tahoma, sans-serif;
  font-size: 11px;
}

.controls {
  margin-top: 10px;

  display: flex;
  justify-content: center;
  gap: 8px;
}

.controls button,
.connect-button {
  font-family: Tahoma, sans-serif;
}

.connect-button {
  margin-top: 10px;

  width: 100%;
}
</style>