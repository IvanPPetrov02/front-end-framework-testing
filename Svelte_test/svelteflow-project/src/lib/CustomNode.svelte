<script lang="ts">
    import { Handle, Position } from '@xyflow/svelte';
    export let data;

    let isExpanded = false;

    function toggleExpand() {
        isExpanded = !isExpanded;
    }
</script>

<div class="custom-node" class:expanded={isExpanded}>
    <Handle type="target" position={Position.Left} class="handle-left"/>
    <Handle type="source" position={Position.Right} class="handle-right"/>

    <div class="node-header">
        <strong class="node-title">{data.label}</strong>
        <button class="expand-button" on:click={toggleExpand}>
            {isExpanded ? '−' : '+'}
        </button>
    </div>

    <input
            type="text"
            bind:value={data.variable}
            placeholder="Variable"
            class="node-input"
    />

    {#if isExpanded}
        <div class="node-details">
            <select class="node-select">
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="object">Object</option>
            </select>

            <div class="node-description">
                <small>Node ID: {data.label}-{data.variable}</small>
            </div>
        </div>
    {/if}
</div>

<style>
    .custom-node {
        background: white;
        border: 2px solid #007bff;
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        min-width: 160px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        position: relative;
        transition: all 0.3s ease;
    }

    .custom-node.expanded {
        min-height: 140px;
    }

    .node-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    .node-title {
        color: #007bff;
        font-size: 14px;
        font-weight: bold;
    }

    .expand-button {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #f0f0f0;
        border: 1px solid #ccc;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        padding: 0;
        line-height: 1;
    }

    .node-input {
        width: 90%;
        padding: 5px;
        text-align: center;
        border: 1px solid #aaa;
        border-radius: 4px;
        margin-top: 5px;
    }

    .node-details {
        margin-top: 10px;
        text-align: left;
    }

    .node-select {
        width: 100%;
        padding: 3px;
        margin: 5px 0;
        border-radius: 4px;
        border: 1px solid #aaa;
    }

    .node-description {
        font-size: 11px;
        color: #666;
        margin-top: 5px;
    }

    .handle-left, .handle-right {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #007bff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border: 2px solid white;
    }

    .handle-left {
        left: -7px;
    }

    .handle-right {
        right: -7px;
    }
</style>