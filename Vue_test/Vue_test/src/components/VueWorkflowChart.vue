<template>
  <div>
    <button @click="addNode">Add Node</button>
    <workflow-chart
        :states="steps"
        :transitions="connections"
        :options="{ showLegend: true }"
    ></workflow-chart>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import WorkflowChart from 'vue-workflow-chart';

const steps = ref([
  {id: 'start', label: 'Start', name: 'Start'},  // ✅ Added label
  {id: 'process', label: 'Process', name: 'Process'},  // ✅ Added label
  {id: 'end', label: 'End', name: 'End'},  // ✅ Added label
]);

const connections = ref([
  {from: 'start', to: 'process'},
  {from: 'process', to: 'end'},
]);

const addNode = () => {
  const newId = `node${steps.value.length}`;
  steps.value.push({id: newId, label: `Step ${steps.value.length}`, name: `Step ${steps.value.length}`});  // ✅ Ensure label is added
  connections.value.push({from: 'process', to: newId});
};
</script>

<style>
.workflow-container {
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
