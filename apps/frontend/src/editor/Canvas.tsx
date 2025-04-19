import "@xyflow/react/dist/style.css";

import { Background, Controls, NodeTypes, ReactFlow } from "@xyflow/react";
import { FC } from "react";

import { useEditorState } from "./editorState.ts";
import { GateNodeComponent } from "./nodes/GateNode.tsx";

const nodeTypes: NodeTypes = {
    gate: GateNodeComponent,
};

export const Canvas: FC = () => {
    const { nodes, edges, onEdgesChange, onNodesChange, onConnect, addNode } = useEditorState();

    return (
        <div className="h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                panOnScroll={true}
                panOnScrollSpeed={1}
                colorMode={"dark"}
            >
                <Background />
                <Controls />
            </ReactFlow>
            <button
                className="absolute top-3 left-3 z-10 py-2 px-5 bg-zinc-800 border border-zinc-700 rounded"
                onClick={addNode}
            >
                Add Node
            </button>
        </div>
    );
};
