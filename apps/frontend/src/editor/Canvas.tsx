import "@xyflow/react/dist/style.css";

import { Background, Controls, DefaultEdgeOptions, ReactFlow } from "@xyflow/react";
import { FC, useMemo } from "react";

import { CustomEdge } from "@/editor/CustomEdge.tsx";
import { StickerNode } from "@/editor/easterEggs/StickerNode.tsx";
import { REGISTERED_NODES_PROPERTIES } from "@/editor/nodes/nodes.ts";
import { useStickerHandler } from "@/hooks/useStickerHandler.ts";

import { useEditorState } from "./editorState.ts";

const nodeTypes = REGISTERED_NODES_PROPERTIES["component"];

const edgeTypes = {
    "custom-edge": CustomEdge,
};

export const Canvas: FC = () => {
    const nodes = useEditorState.use.nodes();
    const edges = useEditorState.use.edges();
    const onEdgesChange = useEditorState.use.onEdgesChange();
    const onNodesChange = useEditorState.use.onNodesChange();
    const onConnect = useEditorState.use.onConnect();
    const onSelectionChange = useEditorState.use.onSelectionChange();

    const nodeTypesWithEasterEgg = useMemo(
        () => ({
            ...nodeTypes,
            sticker: StickerNode,
        }),
        [],
    );

    const defaultEdgeOptions: DefaultEdgeOptions = useMemo(
        () => ({
            type: "custom-edge",
        }),
        [],
    );

    useStickerHandler();

    return (
        <div className="h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onSelectionChange={onSelectionChange}
                nodeTypes={nodeTypesWithEasterEgg}
                edgeTypes={edgeTypes}
                panOnScroll={true}
                panOnScrollSpeed={1}
                colorMode={"dark"}
                defaultEdgeOptions={defaultEdgeOptions}
            >
                <Background />
                <Controls position="bottom-right" />
            </ReactFlow>
        </div>
    );
};
