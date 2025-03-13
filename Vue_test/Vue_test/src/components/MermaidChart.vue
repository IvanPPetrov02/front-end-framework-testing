<template v-if="diagram">
  <div>
    <button @click="reloadMermaid">Reload Diagram</button>
    <div class="mermaid">
      {{ diagram }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import mermaid from 'mermaid';

const diagram = ref(`
  graph TD;
    A[Start] --> B{Decision};
    B -- Yes --> C[Continue];
    B -- No --> D[Stop];
`);

const reloadMermaid = () => {
  mermaid.contentLoaded();
};

onMounted(() => {
  mermaid.initialize({ startOnLoad: true });
  reloadMermaid();
});

watch(diagram, () => {
  reloadMermaid();
});
</script>

<style>
.mermaid {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
}
</style>
