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
}

.custom-node input {
  margin-top: 8px;
  width: 90%;
  padding: 5px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 4px;
}

.handle {
  width: 10px;
  height: 10px;
  background: #555;
  border-radius: 50%;
}
</style>
