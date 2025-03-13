<script lang="ts">
    export let data;
</script>

<div class="custom-node">
    <div class="node-header">{data.label}</div>
    {#if data.content}
        <div class="node-content">{data.content}</div>
    {/if}
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
    }

    .node-header {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .node-content {
        color: #777;
        font-size: 10px;
    }
</style>