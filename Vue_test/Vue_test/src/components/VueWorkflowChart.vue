<template>
  <div class="chart-wrapper">
    <button @click="addNode">Add Node</button>
    <div class="workflow-chart-container">
      <workflow-chart
          v-if="steps.length > 0"
          :states="steps"
          :transitions="connections"
          :options="{ showLegend: true }"
      ></workflow-chart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WorkflowChart from 'vue-workflow-chart';

const steps = ref([
  { id: 'start', label: 'Start', name: 'Start' },
  { id: 'process', label: 'Process', name: 'Process' },
  { id: 'end', label: 'End', name: 'End' }
]);

const connections = ref([
  { from: 'start', to: 'process' },
  { from: 'process', to: 'end' }
]);

const addNode = () => {
  const newId = `node${steps.value.length}`;
  steps.value.push({ id: newId, label: `Step ${steps.value.length}`, name: `Step ${steps.value.length}` });
  connections.value.push({ from: 'process', to: newId });
};
</script>

<style>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.workflow-chart-container {
  margin-top: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  background-color: #f9f9f9;
  flex-grow: 1;
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible; /* Allow content to overflow if needed */
  position: relative;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 10px;
}

button:hover {
  background-color: #36a372;
}

/* Ensure workflow chart fits properly */
.workflow-chart-container > * {
  width: 100%;
  height: 100%;
}

/* Custom styles for workflow chart */
.v-wfc-container .v-wfc-node {
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.v-wfc-node, .v-wfc-edge {
  pointer-events: all;
  z-index: 10;
}

/* Override any potential hidden elements */
.v-wfc-container {
  overflow: visible !important;
}
</style>
