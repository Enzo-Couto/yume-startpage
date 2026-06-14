<template>
  <div class="panel">
    <div class="panel-header">
      Widgets
    </div>

    <div class="panel-body">
      <a
        v-for="widget in widgets"
        :key="widget.title"
        :href="widget.url"
        target="_blank"
        class="widget-card"
      >
        <div class="widget-title">
          {{ widget.title }}
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const widgets = [
  {
    title: "Inbox",
    description: "Check Gmail",
    url: "https://mail.google.com/"
  },
  {
    title: "ChatGPT",
    description: "Open AI Assistant",
    url: "https://chatgpt.com/"
  },
  {
    title: "News",
    description: "Hacker News",
    url: "https://news.ycombinator.com/"
  },
  {
    title: "Calendar",
    description: "Google Calendar",
    url: "https://calendar.google.com/"
  }
]
</script>

<style scoped>
.panel {
  background: #d4d0c8;
}

.panel-header {
  background: #4f6fcf;
  color: white;

  padding: 4px 8px;

  font-size: 13px;
  font-weight: bold;
}

.panel-body {
  padding: 10px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.widget-card {
  text-decoration: none;
  color: black;

  background: #d4d0c8;

  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;

  padding: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  font-family: Tahoma, sans-serif;

  transition: transform 0.1s;
}

.widget-card:hover {
  background: #e5e5e5;
}

.widget-card:active {
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;

  transform: translateY(1px);
}

.widget-icon {
  font-size: 20px;
  margin-bottom: 8px;
}

.widget-title {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 4px;
}

.widget-description {
  font-size: 11px;
  color: #555;
}
</style>