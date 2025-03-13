<script lang="ts">
    import { Svelvet, Node, Edge } from "svelvet";
    import { onMount } from 'svelte';

    // Define initial nodes
    let nodes = [
        {
            id: "1",
            position: { x: 250, y: 100 },
            data: { label: "Node 1" }
        },
        {
            id: "2",
            position: { x: 100, y: 250 },
            data: { label: "Node 2" }
        },
        {
            id: "3",
            position: { x: 400, y: 250 },
            data: { label: "Node 3" }
        },
        {
            id: "4",
            position: { x: 250, y: 400 },
            data: { label: "Node 4" }
        }
    ];

    // Define edges connecting the nodes
    let edges = [
        { 
            id: "e1-2", 
            source: "1", 
            target: "2", 
            animated: true 
        },
        { 
            id: "e1-3", 
            source: "1", 
            target: "3" 
        },
        { 
            id: "e2-4", 
            source: "2", 
            target: "4" 
        },
        { 
            id: "e3-4", 
            source: "3", 
            target: "4", 
            animated: true 
        }
    ];

    // Node counter for adding new nodes
    let nodeId = 5;

    function addNode() {
        const newNode = {
            id: String(nodeId),
            position: { x: 100 + Math.random() * 400, y: 100 + Math.random() * 400 },
            data: { label: `Node ${nodeId}` }
        };
        
        nodes = [...nodes, newNode];
        nodeId++;
    }

    onMount(() => {
        console.log("Component mounted");
    });
</script>

<div class="flow-wrapper">
    <div class="button-container">
        <button on:click={addNode}>Add Node</button>
    </div>

    <div class="flow-container">
        <Svelvet 
            {nodes} 
            {edges}
            nodesDraggable={true}
            pannable={true}
            zoomable={true}
            snapToGrid={true}
            edgesUpdatable={true}
            width="100%"
            height="600px"
        />
    </div>
</div>

<style>
    .flow-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .button-container {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }

    .flow-container {
        height: 600px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    }

    button {
        padding: 8px 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>