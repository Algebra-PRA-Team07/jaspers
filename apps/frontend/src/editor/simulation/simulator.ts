import { Edge } from "@xyflow/react";

import { getRegisteredNodesProperty } from "@/editor/nodes/nodes.ts";
import { EdgeStates, LogicNode, LogicState } from "@/editor/types.ts";

const simulatorNodes = getRegisteredNodesProperty("simulation");

export class Simulator {
    private nodes: LogicNode[];
    private edges: Edge[];

    constructor(nodes: LogicNode[], edges: Edge[]) {
        this.nodes = nodes.map((n) => ({
            ...n,
            data: {
                ...n.data,
                simulator: new simulatorNodes[n.type!](),
            },
        }));
        this.edges = edges;
    }

    private getNodeWithId(id: string): LogicNode | undefined {
        return this.nodes.find((n) => n.id === id);
    }

    private runSimulation(queue: LogicNode[]) {
        let iterations = 0;

        // Simulator Loop
        while (queue.length > 0) {
            iterations++;

            if (iterations >= 10_000) {
                throw new Error("Simulation failure!");
            }

            const currentNode = queue.shift()!;

            // 1. Process this node
            const simNode = currentNode.data.simulator;

            if (!simNode) throw new Error("Uh oh");

            const getStateForOutputHandle = (handle: string, nodeId: string) => {
                const node = this.getNodeWithId(nodeId);
                const state = node!.data.simulator!.output;

                return state[handle];
            };

            const logicStates = this.edges
                .filter((edge) => edge.target === currentNode.id)
                .map((edge): [string, LogicState] => [
                    edge.targetHandle!,
                    getStateForOutputHandle(edge.sourceHandle!, edge.source),
                ]);
            const input: EdgeStates = Object.fromEntries(logicStates);

            const changedHandles = simNode.receiveInput(currentNode.data, input);

            // 2. If the state has changed, add its neighbors to be the queue for processing
            const neighbourEdges = this.edges.filter(
                (edge) =>
                    edge.source === currentNode.id && changedHandles.includes(edge.sourceHandle!),
            );

            for (const edge of neighbourEdges) {
                queue.push(this.getNodeWithId(edge.target)!);
            }
        }

        console.log(`Simulation stable in ${iterations} iterations`);
    }

    public runFullSimulation(): LogicNode[] {
        // Start the queue filled with nodes that don't have inputs (dependencies to other nodes)
        const queue: LogicNode[] = this.nodes.filter(
            (node) => !this.edges.some((edge) => edge.target === node.id),
        );

        this.runSimulation(queue);

        return this.nodes;
    }

    public updateSimulation(
        affectedNode: LogicNode,
        nodes: LogicNode[],
        edges: Edge[],
    ): LogicNode[] {
        // recreate all (bad)
        this.nodes = nodes.map((n) => ({
            ...n,
            data: {
                ...n.data,
            },
        }));
        this.edges = edges;

        this.runSimulation([affectedNode]);

        return this.nodes;
    }
}
