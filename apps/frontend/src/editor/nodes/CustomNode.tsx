import { Edge, Handle, HandleType, NodeProps, Position } from "@xyflow/react";
import { FC } from "react";

import { BaseNode } from "@/editor/nodes/BaseNode.tsx";
import { InputNode } from "@/editor/nodes/InputNode.tsx";
import { Simulator } from "@/editor/simulation/simulator.ts";
import { EdgeStates, LogicNode, LogicNodeData, SimulatorNode } from "@/editor/types.ts";

export interface CustomNodeData extends LogicNodeData {
    nodes: LogicNode[];
    edges: Edge[];

    inputs: string[]; // Input node ids
    outputs: string[]; // Output node ids
}

export type CustomNode = LogicNode<CustomNodeData, "custom">;

export class CustomSimulatorNode extends SimulatorNode {
    private simulator?: Simulator;

    override calculateNewState(data: CustomNodeData, inputs: EdgeStates): EdgeStates {
        if (!this.simulator) {
            this.simulator = new Simulator();
        }

        data.nodes = data.nodes.map((node) => {
            if (node.type !== "_input") return node;

            const output = node as InputNode;

            return {
                ...output,
                data: {
                    ...output.data,
                    desiredState: inputs[output.id] ?? "unknown",
                },
            };
        });

        data.nodes = this.simulator!.updateSimulation(null, data.nodes, data.edges);

        const outputNodes = data.nodes.filter((node) => data.outputs.includes(node.id));

        return Object.fromEntries(
            outputNodes.map((outputNode) => [
                outputNode.id,
                outputNode.data.simulator!.output["out"],
            ]),
        );
    }
}

const HandleGroup: FC<{ ids: string[]; type: HandleType; position: Position }> = ({
    ids,
    type,
    position,
}) => {
    const start = 30;
    const end = 70;

    return (
        <>
            {ids.map((id, index) => {
                const top =
                    ids.length === 1 ? 50 : start + ((end - start) * index) / (ids.length - 1);

                return (
                    <Handle
                        key={id}
                        id={id}
                        type={type}
                        position={position}
                        style={{ top: `${top}%` }}
                    />
                );
            })}
        </>
    );
};

export const CustomNodeComponent = ({ selected, data }: NodeProps<CustomNode>) => {
    return (
        <>
            <BaseNode selected={selected}>CustomNode</BaseNode>
            <HandleGroup ids={data.inputs} type={"target"} position={Position.Left} />
            <HandleGroup ids={data.outputs} type={"source"} position={Position.Right} />
        </>
    );
};
