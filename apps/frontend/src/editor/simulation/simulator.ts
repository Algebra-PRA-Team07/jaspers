import { Edge } from "@xyflow/react";

import { getRegisteredNodesProperty } from "../nodes/nodes.ts";
import { LogicNode } from "../types.ts";

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

    private getSourcesForNode(id: string): LogicNode[] {
        return this.edges
            .filter((edge) => edge.target === id)
            .map((edge) => this.getNodeWithId(edge.source)!);
    }

    private getTargetsForNode(id: string): LogicNode[] {
        return this.edges
            .filter((edge) => edge.source === id)
            .map((edge) => this.getNodeWithId(edge.target)!);
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

            const inputs = this.getSourcesForNode(currentNode.id).map(
                (node) => node.data.simulator!.state,
            );

            const newState = simNode.calculateNewState(currentNode.data, inputs);

            // 2. If the state has changed, add its neighbors to be the queue for processing
            if (newState !== simNode.state || simNode.state === "unknown") {
                simNode.state = newState;

                for (const neighbor of this.getTargetsForNode(currentNode.id)) {
                    queue.push(neighbor);
                }
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
