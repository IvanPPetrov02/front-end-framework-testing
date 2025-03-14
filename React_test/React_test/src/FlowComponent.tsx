import React, { useState, useCallback } from "react";
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType,
    Handle,
    Position,
    Panel,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
    {
        id: "1",
        position: { x: 250, y: 5 },
        data: { label: "Move", variable: "x" },
        type: "customNode",
    },
    {
        id: "2",
        position: { x: 100, y: 150 },
        data: { label: "Transfer", variable: "y" },
        type: "customNode",
    },
    {
        id: "3",
        position: { x: 400, y: 200 },
        data: { label: "Swap", variable: "z" },
        type: "customNode",
    },
];

const initialEdges = []; // No default connections

// Custom Node Component
const CustomNode = ({ data }) => {
    const [variable, setVariable] = useState(data.variable);
    
    // Determine node color based on label
    const getNodeStyles = () => {
        switch(data.label) {
            case 'Move':
                return {
                    background: '#ebf8ff',
                    border: '2px solid #3182ce',
                    boxShadow: '0 4px 6px rgba(49, 130, 206, 0.3)'
                };
            case 'Transfer':
                return {
                    background: '#edfaef',
                    border: '2px solid #38a169',
                    boxShadow: '0 4px 6px rgba(56, 161, 105, 0.3)'
                };
            case 'Swap':
                return {
                    background: '#fff5f5',
                    border: '2px solid #e53e3e',
                    boxShadow: '0 4px 6px rgba(229, 62, 62, 0.3)'
                };
            default:
                return {
                    background: '#fff',
                    border: '2px solid #333',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                };
        }
    };

    const nodeStyle = getNodeStyles();

    return (
        <div
            style={{
                width: 160,
                height: 120,
                padding: 12,
                borderRadius: 12,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                ...nodeStyle
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    background: "#555",
                    width: 12,
                    height: 24,
                    borderRadius: "0 6px 6px 0",
                    left: -6,
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{
                    background: "#555",
                    width: 12,
                    height: 24,
                    borderRadius: "6px 0 0 6px",
                    right: -6,
                }}
            />

            <strong style={{ 
                fontSize: "16px", 
                color: "#2c5282", 
                marginBottom: "8px",
                fontWeight: "600"
            }}>
                {data.label}
            </strong>

            <input
                type="text"
                value={variable}
                onChange={(e) => setVariable(e.target.value)}
                placeholder="Variable"
                style={{
                    width: "90%",
                    textAlign: "center",
                    border: "1px solid #cbd5e0",
                    borderRadius: 6,
                    padding: 8,
                    fontSize: "14px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)"
                }}
                className="focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
        </div>
    );
};

// Node Types Mapping
const nodeTypes = { customNode: CustomNode };

const FlowComponent = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeId, setNodeId] = useState(4); // Start at 4 since we already have 3 nodes

    // Function to add new nodes
    const addNode = (type) => {
        const newNode = {
            id: `${nodeId}`,
            position: { x: 200, y: nodeId * 100 },
            data: { label: type, variable: `${type.toLowerCase().charAt(0)}${nodeId}` },
            type: "customNode",
        };

        setNodes((nds) => [...nds, newNode]);
        setNodeId((id) => id + 1);
    };

    // Handle new connections
    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    {
                        source: params.source,
                        target: params.target,
                        animated: false,
                        type: "smoothstep",
                        style: { strokeWidth: 2, stroke: "#000" },
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                            width: 14,
                            height: 14,
                            color: "#000",
                        },
                    },
                    eds
                )
            ),
        [setEdges]
    );

    // Handle edge deletion on double-click
    const onEdgeDoubleClick = useCallback(
        (_, edge) => setEdges((eds) => eds.filter((e) => e.id !== edge.id)),
        [setEdges]
    );

    // Handle node deletion on double-click
    const onNodeDoubleClick = useCallback(
        (_, node) => {
            setNodes((nds) => nds.filter((n) => n.id !== node.id)); // Remove node
            setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id)); // Remove edges connected to node
        },
        [setNodes, setEdges]
    );

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow-md">
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => addNode("Move")}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                    Add Move Node
                </button>
                <button
                    onClick={() => addNode("Transfer")}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all"
                >
                    Add Transfer Node
                </button>
                <button
                    onClick={() => addNode("Swap")}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-all"
                >
                    Add Swap Node
                </button>
            </div>

            <div style={{ 
                width: "100%", 
                height: "650px", 
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onEdgeDoubleClick={onEdgeDoubleClick}
                    onNodeDoubleClick={onNodeDoubleClick}
                    fitView
                    nodeTypes={nodeTypes}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background 
                        variant="dots" 
                        gap={16} 
                        size={1.5} 
                        color="#9CA3AF"
                    />
                    <Controls 
                        showZoom={true} 
                        showFitView={true} 
                        showInteractive={false}
                        style={{
                            borderRadius: '8px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Panel position="bottom-right">
                        <div className="bg-white p-3 rounded-lg shadow text-sm">
                            <p className="text-gray-600">Double-click to delete nodes and edges</p>
                        </div>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    );
};

export default FlowComponent;
