<script lang="ts">
    import { onMount } from 'svelte';
    
    // Import correctly per documentation
    import { Svelvet, Node as SvelvetNode, Edge as SvelvetEdge } from "svelvet";
    
    // Accept shared nodes from parent component
    export let sharedNodes = [];

    // Define initial nodes with data that works for Svelvet
    let nodesList = sharedNodes.map((node, index) => ({
        id: node.id,
        position: { x: 250, y: 100 + index * 120 },
        data: { 
            label: node.label || `Node ${node.id}`,
            content: node.variable || `Variable ${node.id}`
        },
        style: {
            border: '1px solid #007bff',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: 'white'
        }
    }));

    // Define edges connecting the nodes per Svelvet documentation
    let edgesList = [
        { 
            id: "e1-2", 
            source: "1", 
            target: "2", 
            animated: true 
        },
        { 
            id: "e2-3", 
            source: "2", 
            target: "3"
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
            position: { x: 150 + Math.random() * 300, y: 100 + Math.random() * 300 },
            data: { 
                label: `Node ${nodeId}`,
                content: `Variable ${nodeId}`
            },
            style: {
                border: '1px solid #007bff',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: 'white'
            }
        };
        
        nodesList = [...nodesList, newNode];
        nodeId++;
    }

    onMount(() => {
        console.log("Svelvet component mounted");
    });

    // Use custom node template function per documentation
    function nodeTemplate(node) {
        const { data } = node;
        return `
            <div>
                <div style="font-weight: bold; color: #007bff;">${data.label}</div>
                <div style="font-size: 12px; color: #777;">${data.content}</div>
            </div>
        `;
    }
</script>

<div class="flow-wrapper">
    <div class="button-container">
        <button on:click={addNode}>Add Node</button>
    </div>

    <div class="flow-container">
        <Svelvet 
            nodes={nodesList} 
            edges={edgesList}
            {nodeTemplate}
            width="100%"
            height="100%"
            borderRadius={8}
            backgroundImage="none"
            backgroundColor="#f5f5f5"
            nodeColor="#ffffff"
            edgeColor="#333333"
        />
    </div>
</div>

<style>
    .flow-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .button-container {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }

    .flow-container {
        flex-grow: 1;
        height: 580px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
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