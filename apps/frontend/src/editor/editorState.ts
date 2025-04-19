import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    OnSelectionChangeFunc,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { create } from "zustand/react";

import { GateNode } from "./nodes/GateNode.tsx";

interface EditorState {
    nodes: Node[];
    edges: Edge[];
    selectedNodes: Node[];

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onSelectionChange: OnSelectionChangeFunc;

    addNode: () => void;
    updateNodeData: (nodeId: string, data: Record<string, unknown>) => void;
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
                    gateType: "XOR",
                    negated: true,
                },
            } satisfies GateNode),
        });
    },
}));
