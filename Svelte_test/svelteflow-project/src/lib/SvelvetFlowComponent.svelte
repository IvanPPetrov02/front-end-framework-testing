<script lang="ts">
                            import { writable } from 'svelte/store';
                            import { Svelvet } from 'svelvet';

                            interface SvelvetNode {
                                id: string;
                                label: string;  // Changed from text to label
                                data?: string;
                                x: number;      // Using x, y directly
                                y: number
                            }

                            export let sharedNodes: { id: string; label: string; variable: string; }[] = [];
                            let nodeId = 5;

                            // Initialize nodes with correct Svelvet format
                            const nodesStore = writable<SvelvetNode[]>(
                                sharedNodes.map((node, index) => ({
                                    id: node.id,
                                    label: node.label,
                                    data: node.variable,
                                    x: 200,
                                    y: 100 + index * 120
                                }))
                            );

                            // Initialize edges
                            const edgesStore = writable([
                                { id: 'e1-2', start: '1', end: '2' },  // Using start/end instead of source/target
                                { id: 'e2-3', start: '2', end: '3' },
                                { id: 'e3-4', start: '3', end: '4' }
                            ]);

                            function addNewNode() {
                                nodesStore.update(nodes => [
                                    ...nodes,
                                    {
                                        id: `${nodeId}`,
                                        label: `Node ${nodeId}`,
                                        data: `var${nodeId}`,
                                        x: 200,
                                        y: 100 + nodeId * 100
                                    }
                                ]);
                                nodeId++;
                            }

                            function addTransferNode() {
                                nodesStore.update(nodes => [
                                    ...nodes,
                                    {
                                        id: `${nodeId}`,
                                        label: 'Transfer',
                                        data: `amount${nodeId}`,
                                        x: 200,
                                        y: 100 + nodeId * 100
                                    }
                                ]);
                                nodeId++;
                            }
                        </script>

                        <div class="button-container">
                            <button on:click={addNewNode}>Add Node</button>
                            <button on:click={addTransferNode}>Add Transfer</button>
                        </div>

                        <div style="height: 600px; border: 1px solid #ddd; border-radius: 5px;">
                            <Svelvet nodes={$nodesStore} connections={$edgesStore} />
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
                        </style>