import "@xyflow/react/dist/style.css";

import { Background, Controls, NodeTypes, ReactFlow } from "@xyflow/react";
import { FC } from "react";

import { useEditorState } from "./editorState.ts";
import { getRegisteredNodesProperty } from "./nodes/nodes.ts";

const nodeTypes: NodeTypes = getRegisteredNodesProperty("component");

export const Canvas: FC = () => {
    const { nodes, edges, onEdgesChange, onNodesChange, onConnect, onSelectionChange } =
        useEditorState();

    return (
        <div className="h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onSelectionChange={onSelectionChange}
                nodeTypes={nodeTypes}
                panOnScroll={true}
                panOnScrollSpeed={1}
                colorMode={"dark"}
            >
                <Background />
                <Controls position="bottom-right" />
            </ReactFlow>
        </div>
    );
};
