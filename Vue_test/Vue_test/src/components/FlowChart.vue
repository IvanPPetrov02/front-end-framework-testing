<template>
  <div>
    <button @click="addNode('default')">Add Default Node</button>
    <button @click="addNode('transfer')">Add Transfer Node</button>

    <div class="workflow-container">
      <vue-flow
          :nodes="nodes"
          :edges="edges"
          @connect="onConnect"
          @edge-dblclick="onEdgeDoubleClick"
          :node-types="nodeTypes"
          fit-view
      >
      </vue-flow>
    </div>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue'
import { VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const nodeTypes = { custom: CustomNode }

const nodes = shallowRef([
  {id: '1', type: 'custom', position: {x: 250, y: 5}, data: {label: 'Move', variable: 'var1'}},
  {id: '2', type: 'custom', position: {x: 100, y: 150}, data: {label: 'Transfer', variable: 'var2'}},
  {id: '3', type: 'custom', position: {x: 400, y: 300}, data: {label: 'Swap', variable: 'var3'}},
])

const edges = shallowRef([])

let nodeId = 4

const addNode = (type) => {
  nodes.value.push({
    id: `${nodeId}`,
    type: 'custom',
    position: {x: Math.random() * 400, y: Math.random() * 400},
    data: {label: type === 'transfer' ? 'Transfer' : `Node ${nodeId}`, variable: `var${nodeId}`},
  })
  nodeId++
}

const onConnect = (params) => {
  edges.value.push({id: `e${params.source}-${params.target}`, ...params})
}

const onEdgeDoubleClick = (event, edge) => {
  edges.value = edges.value.filter((e) => e.id !== edge.id)
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

button {
  margin: 5px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
}

.workflow-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  margin: auto;
}
</style>
