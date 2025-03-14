<template v-if="data">
  <div class="custom-node">
    <strong>{{ data.label }}</strong>
    <input v-model="data.variable" placeholder="Variable" />
    <handle type="source" position="right" />
    <handle type="target" position="left" />
  </div>
</template>

<script setup>
import { Handle } from '@vue-flow/core';
import { toRefs } from 'vue';

const props = defineProps(['data']);
const { data } = toRefs(props);
</script>

<style>
.custom-node {
  background: white;
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  min-width: 140px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 20;
  position: relative;
  transform-origin: center center;
  transform: scale(1); /* Will allow node to scale properly */
}

.custom-node strong {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #2c3e50;
}

.custom-node input {
  margin-top: 8px;
  width: 90%;
  padding: 5px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 14px;
}

.handle {
  width: 12px;
  height: 12px;
  background: #42b883;
  border: 2px solid white;
  border-radius: 50%;
  z-index: 30;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

/* Add hover effect to handles to make them easier to use */
.handle:hover {
  transform: scale(1.5);
  cursor: crosshair;
}
</style>
