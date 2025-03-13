<template>
  <div id="app">
    <h1>Vue Workflow Comparison</h1>

    <div class="workflow-container">
      <div class="workflow">
        <h2>VueFlow</h2>
        <FlowChart />
      </div>

      <div class="workflow">
        <h2>Mermaid.js</h2>
        <MermaidChart />
      </div>

      <div class="workflow">
        <h2>Vue Workflow Chart</h2>
<!--        <VueWorkflowChart />-->
      </div>
    </div>
  </div>
</template>

<script setup>
import FlowChart from './components/FlowChart.vue';
import MermaidChart from './components/MermaidChart.vue';
import VueWorkflowChart from './components/VueWorkflowChart.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.workflow-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
}

.workflow {
  width: 30%;
  border: 2px solid #ddd;
  padding: 10px;
  text-align: center;
}

h2 {
  margin-bottom: 10px;
}
</style>
