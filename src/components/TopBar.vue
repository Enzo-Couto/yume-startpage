<template>
  <div class="topbar">
    <div class="market">
      <span class="label">Market:</span>

      <template v-if="loading">
        <span>Loading...</span>
      </template>

      <template v-else>
        <span
        class="ticker"
        :class="prices.btc.change >= 0 ? 'positive' : 'negative'"
        >
        {{ prices.btc.change >= 0 ? '▲' : '▼' }}
        BTC ${{ prices.btc.price }}
        </span>

        <span
        class="ticker"
        :class="prices.xmr.change >= 0 ? 'positive' : 'negative'"
        >
        {{ prices.xmr.change >= 0 ? '▲' : '▼' }}
        XMR ${{ prices.xmr.price }}
        </span>

        <span
        class="ticker"
        :class="prices.sol.change >= 0 ? 'positive' : 'negative'"
        >
        {{ prices.sol.change >= 0 ? '▲' : '▼' }}
        SOL ${{ prices.sol.price }}
        </span>

        <span
        class="ticker"
        :class="prices.atom.change >= 0 ? 'positive' : 'negative'"
        >
        {{ prices.atom.change >= 0 ? '▲' : '▼' }}
        ATOM ${{ prices.atom.price }}
        </span>
      </template>
    </div>

    <div class="date">
      {{ currentDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const loading = ref(true)

const prices = ref({
  btc: { price: '...', change: 0 },
  xmr: { price: '...', change: 0 },
  sol: { price: '...', change: 0 },
  atom: { price: '...', change: 0 }
})

const currentDate = ref('')

let intervalId: number

async function fetchPrices() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,monero,solana,cosmos'
    )

    const data = await response.json()

    const bitcoin = data.find((coin: any) => coin.id === 'bitcoin')
    const monero = data.find((coin: any) => coin.id === 'monero')
    const solana = data.find((coin: any) => coin.id === 'solana')
    const cosmos = data.find((coin: any) => coin.id === 'cosmos')

    prices.value = {
      btc: {
        price: bitcoin?.current_price?.toLocaleString() ?? '?',
        change: bitcoin?.price_change_percentage_24h ?? 0
      },
      xmr: {
        price: monero?.current_price?.toLocaleString() ?? '?',
        change: monero?.price_change_percentage_24h ?? 0
      },
      sol: {
        price: solana?.current_price?.toLocaleString() ?? '?',
        change: solana?.price_change_percentage_24h ?? 0
      },
      atom: {
        price: cosmos?.current_price?.toLocaleString() ?? '?',
        change: cosmos?.price_change_percentage_24h ?? 0
      }
    }

    loading.value = false
  } catch (error) {
    console.error('Erro ao buscar preços:', error)

    loading.value = false
  }
}

function updateDate() {
  currentDate.value = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchPrices()
  updateDate()

  intervalId = window.setInterval(() => {
    fetchPrices()
    updateDate()
  }, 300000) // 5 minutos
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 6px 8px;
  margin-bottom: 8px;

  background: #d4d0c8;

  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;

  font-family: Tahoma, sans-serif;
  font-size: 12px;
}

.market {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.positive {
  color: #008000;
}

.negative {
  color: #c00000;
}

.label {
  font-weight: bold;
}

.ticker {
  padding: 2px 6px;

  background: white;

  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
}

.date {
  white-space: nowrap;
}
</style>