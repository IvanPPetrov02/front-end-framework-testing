<script lang="ts">
    export let data;
    export let id;
    export let inputs = [];
    export let outputs = [];
</script>

<div class="custom-node">
    <div class="node-header">{data.label}</div>
    {#if data.content}
        <div class="node-content">{data.content}</div>
    {/if}
    <div class="node-id">ID: {id}</div>
</div>

<style>
    .custom-node {
        background: white;
        border: 1px solid #1a192b;
        border-radius: 3px;
        color: #222;
        font-size: 12px;
        padding: 10px;
        text-align: center;
        width: 150px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.15);
    }

    .node-header {
        font-weight: bold;
        margin-bottom: 5px;
        color: #007bff;
    }

    .node-content {
        color: #777;
        font-size: 10px;
        margin: 5px 0;
    }
    
    .node-id {
        font-size: 9px;
        color: #999;
        margin-top: 5px;
    }
</style>