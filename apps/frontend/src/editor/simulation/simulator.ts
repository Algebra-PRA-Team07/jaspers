import { Edge } from "@xyflow/react";

import { NodeType, REGISTERED_NODES_PROPERTIES } from "@/editor/nodes/nodes.ts";
import { EdgeStates, LogicNode, LogicState, SimulatorNode } from "@/editor/types.ts";

export class Simulator {
    private nodes: LogicNode[] = [];
    private edges: Edge[] = [];

    private createSimulatorNode(node: LogicNode): SimulatorNode {
        const simulatorNodes = REGISTERED_NODES_PROPERTIES["simulation"];

        return new simulatorNodes[node.type! as NodeType]();
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

    private nodesWithoutInputs(): LogicNode[] {
        return this.nodes.filter((node) => !this.edges.some((edge) => edge.target === node.id));
    }

    public updateSimulation(
        affectedNode: LogicNode | undefined | null,
        nodes: LogicNode[],
        edges: Edge[],
    ): LogicNode[] {
        // recreate all (bad)
        this.nodes = nodes
            .map((n) => ({
                ...n,
                data: {
                    ...n.data,
                    simulator: n.data.simulator ?? this.createSimulatorNode(n),
                },
            }))
            .filter((it) => it.type !== "borna");
        this.edges = edges;

        if (affectedNode) {
            // If we know what specific node has changed, start from that node instead of the entire tree
            this.runSimulation([affectedNode]);
        } else {
            // If we don't know what specific node has changed, run the entire tree
            this.runSimulation(this.nodesWithoutInputs());
        }

        return this.nodes;
    }

    // This just recreates simulator nodes, effectively removing old simulation state for every node
    public runFreshSimulation(nodes: LogicNode[], edges: Edge[]): LogicNode[] {
        const newNodes = nodes
            .map((n) => ({
                ...n,
                data: {
                    ...n.data,
                    simulator: undefined,
                },
            }))
            .filter((it) => it.type !== "borna");

        return this.updateSimulation(null, newNodes, edges);
    }
}
