<template>
  <div class="topbar">
    <div class="market">
      <span class="label">Market:</span>

      <span class="ticker positive">
        ▲ BTC $87,222
      </span>

      <span class="ticker negative">
        ▼ XMR $431.40
      </span>

      <span class="ticker positive">
        ▲ QRL $2.89
      </span>

      <span class="ticker neutral">
        ▬ ATOM $1.97
      </span>

      <span class="ticker positive">
        ▲ SOL $122.92
      </span>
    </div>

    <div class="date">
      🗓 {{ currentDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentDate = ref('')

let interval: number

function updateDate() {
  const now = new Date()

  currentDate.value = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

onMounted(() => {
  updateDate()

  interval = window.setInterval(updateDate, 60000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.topbar {
  background: #d4d0c8;

  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;

  padding: 4px 6px;
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  font-family: Tahoma, sans-serif;
  font-size: 12px;
}

.market {
  display: flex;
  align-items: center;
  gap: 4px;

  flex-wrap: wrap;
}

.label {
  font-weight: bold;
}

.ticker {
  padding: 1px 4px;

  background: white;

  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
}

.positive {
  color: #008000;
}

.negative {
  color: #c00000;
}

.neutral {
  color: #444;
}

.date {
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 4px;
}
</style>