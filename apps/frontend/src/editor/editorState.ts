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

import { Example } from "@/editor/examples.ts";
import { CustomNode, CustomNodeData } from "@/editor/nodes/CustomNode.tsx";
import { InputNode } from "@/editor/nodes/InputNode.tsx";
import { Nodes, NodeType } from "@/editor/nodes/nodes.ts";
import { OutputNode } from "@/editor/nodes/OutputNode.tsx";
import { createSelectors } from "@/lib/zustand.ts";

import { Simulator } from "./simulation/simulator.ts";
import { LogicNode, LogicNodeData } from "./types.ts";

type SimulatorState = "stopped" | "paused" | "running";

export interface EditorState {
    simulatorState: SimulatorState;

    showProperties: boolean;
    toggleProperties: () => void;

    nodes: LogicNode[];
    edges: Edge[];
    selectedNodes: LogicNode[];

    onNodesChange: OnNodesChange<LogicNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onSelectionChange: OnSelectionChangeFunc<LogicNode>;

    addNode: (nodeType: NodeType) => void;
    _addNodeRaw: (nodes: LogicNode) => void;
    updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => void;

    simulator?: Simulator;

    restartSimulation: () => void;
    pauseSimulation: () => void;
    continueSimulation: () => void;
    stopSimulation: () => void;

    customNodes: CustomNodeData[];
    addCustomNode: (customNode: CustomNodeData) => void;
    createCustomNode: (name: string) => void;

    loadExample: (example: Example) => void;
}

const useEditorStateBase = create<EditorState>((set, get) => ({
    simulatorState: "stopped",

    showProperties: true,
    toggleProperties: () => {
        set({ showProperties: !get().showProperties });
    },

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

    addNode: (nodeType: NodeType) => {
        const newNode: LogicNode = {
            id: nanoid(),
            position: { x: 300, y: 200 },
            type: nodeType,
            data: Nodes[nodeType].createData(),
        };

        set({
            nodes: get().nodes.concat(newNode),
        });
    },

    _addNodeRaw(nodes: LogicNode) {
        set({
            nodes: get().nodes.concat(nodes),
        });
    },

    updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => {
        // When nodes are recreated, selectedNodes would contain stale objects
        // That's why selectedNodes are updated
        // This should be fixed by using better React Flow APIs
        let nodes = get().nodes.map((node) => {
            if (node.id === nodeId) {
                return { ...node, data: { ...node.data, ...data } };
            }

            return node;
        });

        if (get().simulatorState === "running") {
            const simulator = get().simulator;

            if (simulator) {
                const affectedNode = nodes.find((node) => node.id === nodeId);

                if (affectedNode) {
                    nodes = simulator.updateSimulation(affectedNode, nodes, get().edges) ?? nodes;
                }
            }
        }

        set({
            nodes,
            selectedNodes: nodes.filter((node) => node.selected),
        });
    },

    restartSimulation: () => {
        const simulator = new Simulator();
        const nodes = simulator.runFreshSimulation(get().nodes, get().edges);

        set({
            simulatorState: "running",
            nodes,
            simulator,
        });
    },

    pauseSimulation: () => {
        if (get().simulatorState !== "running") return;

        set({ simulatorState: "paused" });
    },

    continueSimulation: () => {
        if (get().simulatorState !== "paused") return;

        const simulator = get().simulator;
        let nodes = get().nodes;

        if (simulator) {
            nodes = simulator.updateSimulation(null, nodes, get().edges);
        }

        set({
            simulatorState: "running",
            nodes,
        });
    },

    stopSimulation: () => {
        set({
            simulatorState: "stopped",
            simulator: undefined,
            nodes: get().nodes.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    simulator: undefined,
                },
            })),
        });
    },

    customNodes: [],

    addCustomNode: (customNode: CustomNodeData) => {
        const node: CustomNode = {
            id: nanoid(),
            type: "custom",
            position: { x: 300, y: 200 },
            data: customNode,
        };

        set({
            nodes: get().nodes.concat(node),
        });
    },

    createCustomNode: (name: string) => {
        const nodes = get().selectedNodes.length === 0 ? get().nodes : get().selectedNodes;

        const edges: Edge[] = get().edges.filter((edge) =>
            nodes.find((node) => node.id === edge.target),
        ); // Only include edges that have targets inside the selectedNodes

        const customNodeData: CustomNodeData = {
            id: nanoid(),
            name,
            nodes,
            edges,
            inputs: nodes
                .filter((node) => node.type === "_input")
                .map((node) => {
                    const input = node as InputNode;

                    return { id: input.id, name: input.data.name };
                }),
            outputs: nodes
                .filter((node) => node.type === "_output")
                .map((node) => {
                    const output = node as OutputNode;

                    return { id: output.id, name: output.data.name };
                }),
        };

        const node: CustomNode = {
            id: nanoid(),
            type: "custom",
            position: { x: 300, y: 200 },
            data: customNodeData,
        };

        set({
            nodes: get()
                .nodes.filter((node) => !nodes.some((n) => n.id === node.id))
                .concat(node),

            edges: get().edges.filter((edge) => !edges.includes(edge)),

            customNodes: get().customNodes.concat(customNodeData),
        });
    },

    loadExample: (example: Example) => {
        set({
            nodes: example.nodes,
            edges: example.edges,
        });
    },
}));

export const useEditorState = createSelectors(useEditorStateBase);
