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

    return (
        <div
            style={{
                width: 140,
                height: 100,
                padding: 10,
                background: "#fff",
                border: "2px solid #333",
                borderRadius: 10,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            {/* Connection Points (Handles) - Center Left & Center Right */}
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

            <strong style={{ fontSize: "14px", color: "#007bff", marginBottom: "5px" }}>
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
                    border: "1px solid #aaa",
                    borderRadius: 4,
                    padding: 5,
                }}
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

    // Function to add a new "Transfer" node
    const addTransferNode = () => {
        const newNode = {
            id: `${nodeId}`,
            position: { x: 200, y: nodeId * 100 },
            data: { label: "Transfer", variable: `var${nodeId}` },
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
        <div>
            {/* Button to Add New "Transfer" Nodes */}
            <button
                onClick={addTransferNode}
                style={{
                    marginBottom: "10px",
                    padding: "10px 15px",
                    fontSize: "16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Add Transfer Node
            </button>

            <div style={{ width: "100%", height: "500px", border: "1px solid #ddd" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onEdgeDoubleClick={onEdgeDoubleClick} // Double-click to remove edge
                    onNodeDoubleClick={onNodeDoubleClick} // Double-click to remove node
                    fitView
                    nodeTypes={nodeTypes}
                    proOptions={{ hideAttribution: true }} // Hides React Flow watermark
                >
                    <Background />
                    <Controls showZoom={true} showFitView={true} showInteractive={false} />
                </ReactFlow>
            </div>
        </div>
    );
};

export default FlowComponent;
