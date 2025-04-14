import "@xyflow/react/dist/style.css";

import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    NodeTypes,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlow,
} from "@xyflow/react";
import { useAtom } from "jotai";
import { FC, useCallback } from "react";

import { EditorState, useEditorActions } from "./editorState.ts";
import { LogicNode } from "./logicNode.ts";
import ButtonNode from "./nodes/ButtonNode.tsx";
import GateNode from "./nodes/GateNode.tsx";

const nodeTypes: NodeTypes = {
    gate: GateNode,
    button: ButtonNode,
};

export const Canvas: FC = () => {
    const [nodes, setNodes] = useAtom(EditorState.nodes);
    const [edges, setEdges] = useAtom(EditorState.edges);
    const { runSimulation } = useEditorActions();

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds) as LogicNode[]),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );

    const onConnect: OnConnect = useCallback(
        (parameters) => setEdges((eds) => addEdge(parameters, eds)),
        [setEdges],
    );

    return (
        <div style={{ height: "100%" }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Background />
                <Controls />
            </ReactFlow>
            <button
                onClick={runSimulation}
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 1000,
                    padding: "8px 16px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    cursor: "pointer",
                }}
            >
                Run Simulation
            </button>
        </div>
    );
};
