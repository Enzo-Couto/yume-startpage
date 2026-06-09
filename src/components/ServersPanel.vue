<template>
  <div class="panel">
    <div class="panel-header">
      ★ Servers
    </div>

    <div class="panel-body">
      <a
        v-for="server in servers"
        :key="server.name"
        :href="server.url"
        target="_blank"
        class="server-item"
      >
        <span class="server-icon">
          {{ server.icon }}
        </span>

        <div class="server-info">
          <div class="server-name">
            {{ server.name }}
          </div>

          <div class="server-description">
            {{ server.description }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const servers = [
  {
    icon: "💬",
    name: "Discord",
    description: "Friends & communities",
    url: "https://discord.com/channels/@me"
  },
  {
    icon: "🚓",
    name: "Strength RP",
    description: "FiveM roleplay",
    url: "https://fivem.net/"
  },
  {
    icon: "🎮",
    name: "RuneScape",
    description: "MMORPG",
    url: "https://www.runescape.com/"
  },
  {
    icon: "💻",
    name: "GitHub",
    description: "Projects",
    url: "https://github.com/"
  }
]
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
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.server-item {
  display: flex;
  gap: 8px;

  padding: 6px;

  text-decoration: none;
  color: black;

  font-family: Tahoma, sans-serif;
}

.server-item:hover {
  background: #0a246a;
  color: white;
}

.server-icon {
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;

  flex-shrink: 0;
}

.server-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.server-name {
  font-size: 13px;
  font-weight: bold;
}

.server-description {
  font-size: 11px;
  color: #555;
}

.server-item:hover .server-description {
  color: #dcdcdc;
}
</style>