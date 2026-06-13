<template>
  <div class="panel">
    <div class="panel-header">
      Security Wire
    </div>

    <div class="panel-body">
      <div
        v-if="loading"
        class="loading"
      >
        Loading stories...
      </div>

      <a
        v-for="story in stories"
        :key="story.id"
        :href="story.url"
        target="_blank"
        rel="noopener noreferrer"
        class="news-item"
      >
        <div class="news-title">
          {{ story.title }}
        </div>

        <div class="news-meta">
          {{ story.domain }} • {{ story.score }} points
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Story {
  id: number
  title: string
  url: string
  score: number
  domain: string
}

const stories = ref<Story[]>([])
const loading = ref(true)

let intervalId: number

async function fetchStories() {
  try {
    loading.value = true

    const idsResponse = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    )

    const ids: number[] = await idsResponse.json()

    const topIds = ids.slice(0, 5)

    const results = await Promise.all(
      topIds.map(async (id) => {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        )

        const item = await response.json()

        let domain = 'Hacker News'

        if (item.url) {
          try {
            domain = new URL(item.url).hostname.replace(
              /^www\./,
              ''
            )
          } catch {
            domain = 'External'
          }
        }

        return {
          id: item.id,
          title: item.title,
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
          score: item.score ?? 0,
          domain
        }
      })
    )

    stories.value = results
  } catch (error) {
    console.error('Erro ao carregar notícias:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStories()

  intervalId = window.setInterval(
    fetchStories,
    600000 // 10 minutos
  )
})

onUnmounted(() => {
  clearInterval(intervalId)
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

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.loading {
  font-family: Tahoma, sans-serif;
  font-size: 12px;
}

.news-item {
  display: block;

  padding: 6px;

  text-decoration: none;
  color: black;

  border-bottom: 1px solid #b8b8b8;

  font-family: Tahoma, sans-serif;
}

.news-item:last-child {
  border-bottom: none;
}

.news-item:hover {
  background: #0a246a;
  color: white;
}

.news-title {
  font-size: 12px;
  font-weight: bold;

  line-height: 1.3;
}

.news-meta {
  margin-top: 2px;

  font-size: 11px;
  color: #666;
}

.news-item:hover .news-meta {
  color: #dcdcdc;
}
</style>