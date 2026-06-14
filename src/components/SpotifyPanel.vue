<template>
  <div class="panel">
    <div class="panel-header">
      Now Playing
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
            {{ status }}
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const albumCover = ref(
  'https://placehold.co/64x64?text=%E2%99%AA'
)

const trackTitle = ref('Nothing playing')
const artist = ref('Yume Companion')

const status = ref('Companion Offline')

const currentTime = ref('00:00')
const totalTime = ref('00:00')

const progress = ref(0)

let interval: number

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000)

  const seconds = Math.floor(
    (ms % 60000) / 1000
  )

  return `${minutes}:${seconds
    .toString()
    .padStart(2, '0')}`
}

async function loadTrack() {
  try {
    const response = await fetch(
      'http://localhost:32145/current-track'
    )

    if (!response.ok) {
      throw new Error()
    }

    const data = await response.json()

    trackTitle.value =
      data.title || 'Nothing playing'

    artist.value =
      data.artist || 'Unknown Artist'

    status.value = data.isPlaying
      ? '🟢 Playing'
      : '⏸ Paused'

    currentTime.value = formatTime(
      data.progress || 0
    )

    totalTime.value = formatTime(
      data.duration || 0
    )

    progress.value =
      data.duration > 0
        ? (data.progress / data.duration) * 100
        : 0

    if (
      data.cover &&
      data.cover.startsWith(
        'spotify:image:'
      )
    ) {
      const imageId = data.cover.replace(
        'spotify:image:',
        ''
      )

      albumCover.value =
        `https://i.scdn.co/image/${imageId}`
    }
  } catch {
    status.value = 'Companion Offline'

    trackTitle.value =
      'Nothing playing'

    artist.value =
      'Yume Companion'

    currentTime.value = '00:00'

    totalTime.value = '00:00'

    progress.value = 0

    albumCover.value =
      'https://placehold.co/64x64?text=%E2%99%AA'
  }
}

onMounted(() => {
  loadTrack()

  interval = window.setInterval(
    loadTrack,
    1000
  )
})

onUnmounted(() => {
  clearInterval(interval)
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

  background: white;

  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
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

  background: #4caf50;

  width: 0%;

  transition: width 0.3s ease;
}

.time-row {
  margin-top: 4px;

  display: flex;
  justify-content: space-between;

  font-family: Tahoma, sans-serif;
  font-size: 11px;
}
</style>