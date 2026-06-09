<template>
  <div class="window">
    <div class="title-bar">
      <div class="title-bar-text">
        Start Page &lt;3
      </div>

      <div class="title-bar-controls">
        <button>-</button>
        <button>□</button>
        <button>×</button>
      </div>
    </div>

    <div class="window-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.window {
  display: inline-block;

  background: #d4d0c8;

  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;

  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.3);

  min-width: 1000px;

  max-width: 95vw;
}

.title-bar {
  background: #4f6fcf;

  color: white;

  padding: 4px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-bar-text {
  font-family: Tahoma, sans-serif;
  font-size: 13px;
  font-weight: bold;
}

.title-bar-controls {
  display: flex;
  gap: 2px;
}

.title-bar-controls button {
  width: 18px;
  height: 18px;

  padding: 0;

  font-size: 11px;
  font-family: Tahoma, sans-serif;
}

.window-body {
  padding: 12px;
}
</style>