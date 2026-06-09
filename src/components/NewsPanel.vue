<template>
  <div class="panel">
    <div class="panel-header">
      Security Wire
    </div>

    <div class="panel-body">
      <a
        v-for="news in newsList"
        :key="news.title"
        :href="news.url"
        target="_blank"
        rel="noopener noreferrer"
        class="news-item"
      >
        <div class="news-title">
          {{ news.title }}
        </div>

        <div class="news-source">
          {{ news.source }}
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const newsList = [
  {
    title: 'New Linux vulnerability discovered',
    source: 'Hacker News',
    url: 'https://news.ycombinator.com/'
  },
  {
    title: 'Researchers warn about phishing campaign',
    source: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/'
  },
  {
    title: 'Mozilla releases Firefox update',
    source: 'Mozilla Blog',
    url: 'https://blog.mozilla.org/'
  },
  {
    title: 'Open-source project reaches new milestone',
    source: 'GitHub Blog',
    url: 'https://github.blog/'
  },
  {
    title: 'Privacy tools you should know in 2026',
    source: 'The Verge',
    url: 'https://www.theverge.com/'
  }
]
</script>

<style scoped>
.panel {
  background: #d4d0c8;
  min-width: 0;
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
  gap: 2px;
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
  line-height: 1.2;
}

.news-source {
  margin-top: 2px;

  font-size: 11px;
  color: #666;
}

.news-item:hover .news-source {
  color: #dcdcdc;
}
</style>