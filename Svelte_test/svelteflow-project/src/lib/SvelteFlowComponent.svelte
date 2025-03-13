<script lang="ts">
    import { writable } from 'svelte/store';
    import {
        SvelteFlow,
        Controls,
        MiniMap,
        Background,
        Panel,
        type Node,
        type Edge,
        MarkerType,
        ConnectionLineType
    } from '@xyflow/svelte';

    import '@xyflow/svelte/dist/style.css';
    import CustomNode from './CustomNode.svelte';

    // Accept shared nodes from parent
    export let sharedNodes = [];

    let nodeId = 5;
    let showMiniMap = true;

    // Initialize nodes with proper positioning for demonstration
    const nodes = writable<Node[]>(
        sharedNodes.map((node, index) => ({
            id: node.id,
            position: {
                x: 150,
                y: 100 + index * 120
            },
            data: {
                label: node.label,
                variable: node.variable
            },
            type: 'custom'
        }))
    );

    // Initialize with some example edges
    const edges = writable<Edge[]>([
        {
            id: '1-2',
            source: '1',
            target: '2',
            type: 'smoothstep',
            animated: true,
            label: 'Process',
            markerEnd: { type: MarkerType.ArrowClosed }
        },
        {
            id: '2-3',
            source: '2',
            target: '3',
            type: 'step',
            style: { stroke: '#FF0072' },
            markerEnd: { type: MarkerType.ArrowClosed }
        },
        {
            id: '3-4',
            source: '3',
            target: '4',
            type: 'bezier',
            animated: true,
            style: { stroke: '#43a047' },
            markerEnd: { type: MarkerType.ArrowClosed }
        }
    ]);

    function addNewNode() {
        nodes.update(n => [
            ...n,
            {
                id: `${nodeId}`,
                position: { x: 150, y: 100 + nodeId * 100 },
                data: {
                    label: `Node ${nodeId}`,
                    variable: `var${nodeId}`
                },
                type: 'custom',
            }
        ]);
        nodeId++;
    }

    function addTransferNode() {
        nodes.update(n => [
            ...n,
            {
                id: `${nodeId}`,
                position: { x: 150, y: 100 + nodeId * 100 },
                data: {
                    label: `Transfer`,
                    variable: `amount${nodeId}`
                },
                type: 'custom',
            }
        ]);
        nodeId++;
    }

    function toggleMiniMap() {
        showMiniMap = !showMiniMap;
    }

    function onConnect(event: CustomEvent<{ source: string; target: string }>) {
        const { source, target } = event.detail;
        edges.update(e => [
            ...e,
            {
                id: `${source}-${target}`,
                source,
                target,
                type: 'smoothstep',
                animated: true,
                markerEnd: { type: MarkerType.ArrowClosed },
            },
        ]);
    }

    function onEdgeDoubleClick(event: CustomEvent<{ edge: Edge }>) {
        const edgeToRemove = event.detail.edge;
        edges.update(e => e.filter(edge => edge.id !== edgeToRemove.id));
    }
</script>

<!-- Workflow container -->
<div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
    <div class="button-container">
        <button on:click={addNewNode}>Add Node</button>
        <button on:click={addTransferNode}>Add Transfer</button>
        <button on:click={toggleMiniMap}>Toggle MiniMap</button>
    </div>

    <div style="flex-grow: 1; border: 1px solid #ddd; border-radius: 5px;">
        <SvelteFlow
                {nodes}
                {edges}
                on:connect={onConnect}
                on:edgedblclick={onEdgeDoubleClick}
                nodeTypes={{ custom: CustomNode }}
                connectionLineType={ConnectionLineType.SmoothStep}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    markerEnd: { type: MarkerType.ArrowClosed }
                }}
                fitView
        >
            <Background variant="dots" gap={20} size={1} />
            <Controls />
            {#if showMiniMap}
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
            {/if}
            <Panel position="bottom-center">
                <div class="info-box">
                    <strong>SvelteFlow Features:</strong> Custom node styles, multiple edge types, animations
                </div>
            </Panel>
        </SvelteFlow>
    </div>
</div>

<style>
    .button-container {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
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

    .info-box {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 8px 12px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        font-size: 12px;
    }
</style>