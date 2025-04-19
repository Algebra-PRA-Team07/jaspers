import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    OnSelectionChangeFunc,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { create } from "zustand/react";

import { GateNode } from "./nodes/GateNode.tsx";
import { LogicNode, LogicNodeData } from "./types.ts";

interface EditorState {
    nodes: LogicNode[];
    edges: Edge[];
    selectedNodes: LogicNode[];

    onNodesChange: OnNodesChange<LogicNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onSelectionChange: OnSelectionChangeFunc<LogicNode>;

    addNode: () => void;
    updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => void;
}

export const useEditorState = create<EditorState>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNodes: [],

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },

    onSelectionChange: ({ nodes }) => {
        set({
            selectedNodes: nodes,
        });
    },

    addNode: () => {
        set({
            nodes: get().nodes.concat({
                id: nanoid(),
                position: { x: 50, y: 50 },
                type: "gate",
                data: {
                    gateType: "AND",
                    negated: false,
                },
            } satisfies GateNode),
        });
    },

    updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => {
        // When new nodes are created, selectedNodes would contain stale objects
        // That's why selectedNodes are updated
        // This should be fixed by using better React Flow APIs
        const nodes = get().nodes.map((node) => {
            if (node.id === nodeId) {
                return { ...node, data: { ...node.data, ...data } };
            }

            return node;
        });

        set({
            nodes,
            selectedNodes: nodes.filter((node) => node.selected),
        });
    },
}));
