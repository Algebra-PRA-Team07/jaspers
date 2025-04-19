import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { create } from "zustand/react";

import { GateNode } from "./nodes/GateNode.tsx";

interface EditorState {
    nodes: Node[];
    edges: Edge[];

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;

    addNode: () => void;
}

export const useEditorState = create<EditorState>((set, get) => ({
    nodes: [],
    edges: [],

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
