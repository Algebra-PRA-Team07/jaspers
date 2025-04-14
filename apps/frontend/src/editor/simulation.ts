import { Edge } from "@xyflow/react";

import { LogicNode } from "./logicNode.ts";

export function runFullSimulation(_nodes: LogicNode[], edges: Edge[]): LogicNode[] {
    // React Flow wants nodes to be recreated for it to rerender them
    // This is an ugly fix that just deep copies ALL nodes
    const nodes: LogicNode[] = _nodes.map((node) => {
        return { ...node, data: { ...node.data } };
    });

    // Helper functions
    function getNodeWithId(id: string): LogicNode | undefined {
        return nodes.find((n) => n.id === id);
    }

    function getSourcesForNode(id: string): LogicNode[] {
        return edges
            .filter((edge) => edge.target === id)
            .map((edge) => getNodeWithId(edge.source)!);
    }

    function getTargetsForNode(id: string): LogicNode[] {
        return edges
            .filter((edge) => edge.source === id)
            .map((edge) => getNodeWithId(edge.target)!);
    }

    // Start the queue filled with nodes that don't have inputs (dependencies to other nodes)
    const queue: LogicNode[] = nodes.filter(
        (node) => !edges.some((edge) => edge.target === node.id),
    );

    let iterations = 0;

    // Simulator Loop
    while (queue.length > 0) {
        iterations++;
        const currentNode = queue.shift()!;

        for (const neighbor of getTargetsForNode(currentNode.id)) {
            const inputs = getSourcesForNode(neighbor.id).map((node) => node.data.state);
            const newState = neighbor.data.calculateNewState(inputs);

            if (newState !== neighbor.data.state || neighbor.data.state === "unknown") {
                neighbor.data.state = newState;
                queue.push(neighbor);
            }
        }
    }

    console.log(`Simulation stable in ${iterations} iterations`);

    return nodes;
}
