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
import { create } from "zustand/react";

import { createSelectors } from "@/lib/zustand.ts";

import { Simulator } from "./simulation/simulator.ts";
import { LogicNode, LogicNodeData } from "./types.ts";

interface EditorState {
    nodes: LogicNode[];
    edges: Edge[];
    selectedNodes: LogicNode[];

    onNodesChange: OnNodesChange<LogicNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onSelectionChange: OnSelectionChangeFunc<LogicNode>;

    addNode: (node: LogicNode) => void;
    updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => void;

    simulator?: Simulator;
    runSimulation: () => void;
}

const useEditorStateBase = create<EditorState>((set, get) => ({
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

    addNode: (node: LogicNode) => {
        set({
            nodes: get().nodes.concat(node),
        });
    },

    updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => {
        // When new nodes are created, selectedNodes would contain stale objects
        // That's why selectedNodes are updated
        // This should be fixed by using better React Flow APIs
        let nodes = get().nodes.map((node) => {
            if (node.id === nodeId) {
                return { ...node, data: { ...node.data, ...data } };
            }

            return node;
        });

        const simulator = get().simulator;

        if (simulator) {
            const affectedNode = nodes.find((node) => node.id === nodeId);

            if (affectedNode) {
                nodes = simulator.updateSimulation(affectedNode, nodes, get().edges) ?? nodes;
            }
        }

        set({
            nodes,
            selectedNodes: nodes.filter((node) => node.selected),
        });
    },

    runSimulation: () => {
        const simulator = new Simulator(get().nodes, get().edges);

        const nodes = simulator.runFullSimulation();

        set({
            nodes,
            simulator,
        });
    },
}));

export const useEditorState = createSelectors(useEditorStateBase);
