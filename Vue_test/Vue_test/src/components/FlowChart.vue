<template>
  <div class="flow-wrapper">
    <div class="button-container">
      <button @click="addNode('default')">Add Default Node</button>
      <button @click="addNode('transfer')">Add Transfer Node</button>
    </div>

    <div class="workflow-container">
      <vue-flow
          v-model="elements"
          :nodes="nodes"
          :edges="edges"
          @connect="onConnect"
          @edge-dblclick="onEdgeDoubleClick"
          :node-types="nodeTypes"
          fit-view
          :fit-view-options="{ padding: 0.2 }"
          :default-zoom="1.2"
          :min-zoom="0.2"
          :max-zoom="4"
          :snap-to-grid="true"
      >
        <template #node-custom="nodeProps">
          <CustomNode v-bind="nodeProps" />
        </template>
        
        <!-- Use Vue Flow standard panels instead of named components -->
        <panel position="bottom-center" class="vue-flow__background-toggle">
          <div class="vue-flow__bg-grid" :style="gridStyle"></div>
        </panel>
        
        <!-- Standard controls using Panel -->
        <panel position="bottom-right">
          <div class="vue-flow__controls">
            <button class="vue-flow__controls-button" title="Zoom in" @click="onZoomIn">+</button>
            <button class="vue-flow__controls-button" title="Zoom out" @click="onZoomOut">-</button>
            <button class="vue-flow__controls-button" title="Fit view" @click="onFitView">⤢</button>
          </div>
        </panel>
      </vue-flow>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, computed, onMounted, ref } from 'vue'
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const nodeTypes = { custom: CustomNode }

// Grid style definition
const gridStyle = ref({
  backgroundSize: '20px 20px',
  backgroundImage: 'linear-gradient(to right, rgba(170, 170, 170, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(170, 170, 170, 0.2) 1px, transparent 1px)'
})

const nodes = shallowRef([
  {id: '1', type: 'custom', position: {x: 250, y: 5}, data: {label: 'Move', variable: 'var1'}},
  {id: '2', type: 'custom', position: {x: 100, y: 150}, data: {label: 'Transfer', variable: 'var2'}},
  {id: '3', type: 'custom', position: {x: 400, y: 300}, data: {label: 'Swap', variable: 'var3'}},
])

const edges = shallowRef([])

// Use the Vue Flow composable for access to instance methods
const { instance, fitView, zoomIn, zoomOut } = useVueFlow();

// Combine nodes and edges for v-model
const elements = computed(() => {
  return [...nodes.value, ...edges.value]
})

let nodeId = 4

const onZoomIn = () => zoomIn({ duration: 300 })
const onZoomOut = () => zoomOut({ duration: 300 })
const onFitView = () => fitView({ padding: 0.2, duration: 300 })

const addNode = (type) => {
  const position = {
    x: 150 + Math.random() * 300, 
    y: 100 + Math.random() * 300
  }
  
  const newNode = {
    id: `${nodeId}`,
    type: 'custom',
    position,
    data: {label: type === 'transfer' ? 'Transfer' : `Node ${nodeId}`, variable: `var${nodeId}`},
  }
  
  nodes.value = [...nodes.value, newNode]
  
  // Remove automatic connection to node 1
  
  nodeId++
  
  // Refit view on next tick to ensure all elements are placed
  setTimeout(() => {
    if (instance.value) {
      fitView({ padding: 0.2 })
    }
  }, 10)
}

const onConnect = (params) => {
  const newEdge = {
    id: `e${params.source}-${params.target}`, 
    ...params, 
    animated: true,
    style: { stroke: '#42b883' }
  }
  
  edges.value = [...edges.value, newEdge]
}

// Update edge double-click handler to properly remove edges
const onEdgeDoubleClick = (event, edge) => {
  // Remove edge when double-clicked
  edges.value = edges.value.filter((e) => e.id !== edge.id)
}

// Add a new function to handle node click for better UX
const onNodeClick = (event, node) => {
  console.log('Node clicked:', node)
  // Optional: implement node selection logic here
}

onMounted(() => {
  // Force rerender on next tick after component is fully mounted
  setTimeout(() => {
    // Reset nodes positions slightly to trigger reactivity
    nodes.value = nodes.value.map(node => ({
      ...node,
      position: {
        x: node.position.x + 0.1,
        y: node.position.y + 0.1
      }
    }))
    
    // Ensure the view is fit properly
    if (instance.value) {
      fitView({ padding: 0.2 })
    }
  }, 100)
})
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.flow-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.button-container {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
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
}

button:hover {
  background-color: #36a372;
}

.workflow-container {
  flex-grow: 1;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background-color: #f9f9f9;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
}

/* Make the Vue Flow instance take the full size of container */
.vue-flow {
  width: 100% !important;
  height: 100% !important;
}

/* Fix for the background pattern */
.vue-flow__background {
  background-size: 20px 20px !important;
  background-image: linear-gradient(to right, rgba(170, 170, 170, 0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(170, 170, 170, 0.2) 1px, transparent 1px) !important;
}

/* Edge styling */
.vue-flow__edge path {
  stroke-width: 2;
  stroke: #42b883;
}

/* Make node handles more prominent */
.vue-flow__handle {
  width: 8px !important;
  height: 8px !important;
  background-color: #42b883 !important;
  border: 2px solid white !important;
}

/* Controls and minimap */
.vue-flow__controls {
  bottom: 20px !important;
  right: 20px !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
  border-radius: 8px !important;
  overflow: hidden;
}

.vue-flow__minimap {
  bottom: 20px !important;
  left: 20px !important;
  border-radius: 8px !important;
  overflow: hidden;
  border: 2px solid #ddd;
}

/* Ensure nodes have sufficient z-index */
.vue-flow__node {
  z-index: 50;
}

/* Create a custom background grid */
.vue-flow__bg-grid {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
  background-size: 20px 20px;
  background-image: linear-gradient(to right, rgba(170, 170, 170, 0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(170, 170, 170, 0.2) 1px, transparent 1px);
}

/* Controls styling */
.vue-flow__controls {
  bottom: 20px !important;
  right: 20px !important;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 50;
  background-color: white;
  padding: 4px;
}

.vue-flow__controls-button {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #555;
  font-size: 16px;
  padding: 4px 8px;
  margin: 2px;
  width: 24px;
  height: 24px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.vue-flow__controls-button:hover {
  background-color: #f5f5f5;
  color: #42b883;
}

/* Add styles to make edges more visible for deletion */
.vue-flow__edge:hover path {
  stroke-width: 4;
  cursor: pointer;
}

.vue-flow__edge.selected path {
  stroke: #ff3366;
  stroke-dasharray: 5;
  animation: dash 0.5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

/* Add tooltip to inform users */
.vue-flow__pane::before {
  content: "Double-click on an edge to delete it";
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 999;
}

.vue-flow__pane:hover::before {
  opacity: 1;
}
</style>