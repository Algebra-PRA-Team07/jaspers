import { Edge, XYPosition } from "@xyflow/react";
import { atom, useAtom } from "jotai";

import { LogicNode, LogicNodeData, LogicState } from "./logicNode.ts";
import { runFullSimulation } from "./simulation.ts";

export function CreateGateNode(id: string, gateType: string, position: XYPosition): LogicNode {
    return {
        id,
        position,
        type: "gate",
        data: {
            state: "unknown",
            gateType,
            calculateNewState(inputs: LogicState[]): LogicState {
                switch (gateType) {
                    case "NOT": {
                        return inputs.every((input) => input === "off") ? "on" : "off";
                    }
                    case "AND": {
                        return inputs.every((input) => input === "on") ? "on" : "off";
                    }
                    case "NOR": {
                        return inputs.includes("on") ? "off" : "on";
                    }
                }

                return "unknown";
            },
        },
    };
}

export function CreateButtonNode(id: string, position: XYPosition): LogicNode {
    return {
        id,
        position,
        type: "button",
        data: {
            state: "off",
            calculateNewState() {
                return this.state;
            },
        },
    };
}

const initialNodes: LogicNode[] = [
    CreateGateNode("nor-1", "NOR", { x: 500, y: 200 }),
    CreateGateNode("nor-2", "NOR", { x: 500, y: 350 }),

    CreateGateNode("and-1", "AND", { x: 400, y: 200 }),
    CreateGateNode("and-2", "AND", { x: 400, y: 350 }),

    CreateButtonNode("btn-enable", { x: 250, y: 270 }),

    CreateGateNode("not-1", "NOT", { x: 220, y: 200 }),

    CreateButtonNode("btn-data", { x: 100, y: 270 }),
];

const initialEdges: Edge[] = [
    { id: "nor-1-nor-2", source: "nor-1", target: "nor-2" },
    { id: "nor-2-nor-1", source: "nor-2", target: "nor-1" },

    { id: "and-1-nor-1", source: "and-1", target: "nor-1", targetHandle: "b" },
    { id: "and-2-nor-2", source: "and-2", target: "nor-2", targetHandle: "b" },

    { id: "btn-enable-and-1", source: "btn-enable", target: "and-1", targetHandle: "b" },
    { id: "btn-enable-and-2", source: "btn-enable", target: "and-2", targetHandle: "b" },

    { id: "not-1-and-1", source: "not-1", target: "and-1" },

    { id: "btn-data-not-1", source: "btn-data", target: "not-1" },
    { id: "btn-data-and-2", source: "btn-data", target: "and-2" },
];

export const EditorState = {
    nodes: atom<LogicNode[]>(initialNodes),
    edges: atom<Edge[]>(initialEdges),
};

export function useEditorActions() {
    const [, setNodes] = useAtom(EditorState.nodes);
    const [edges] = useAtom(EditorState.edges);

    return {
        setNodeData(nodeId: string, data: LogicNodeData) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        return { ...node, data };
                    }

                    return node;
                }),
            );
        },

        runSimulation() {
            setNodes((nds) => runFullSimulation(nds, edges));
        },
    };
}
