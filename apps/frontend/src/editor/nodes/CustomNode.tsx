import { Edge, Handle, HandleType, NodeProps, Position } from "@xyflow/react";
import React, { CSSProperties, FC } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { BaseNode } from "@/editor/nodes/BaseNode.tsx";
import { InputNode } from "@/editor/nodes/InputNode.tsx";
import { Simulator } from "@/editor/simulation/simulator.ts";
import { EdgeStates, LogicNode, LogicNodeData, SimulatorNode } from "@/editor/types.ts";

type PinDefinition = { id: string; name: string };

export interface CustomNodeData extends LogicNodeData {
    id: string;
    name: string;

    nodes: LogicNode[];
    edges: Edge[];

    inputs: PinDefinition[]; // Input nodes
    outputs: PinDefinition[]; // Output nodes
}

export type CustomNode = LogicNode<CustomNodeData, "custom">;

export class CustomSimulatorNode extends SimulatorNode {
    private simulator?: Simulator;

    override calculateNewState(data: CustomNodeData, inputs: EdgeStates): EdgeStates {
        this.simulator ??= new Simulator();

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

        data.nodes = this.simulator.updateSimulation(null, data.nodes, data.edges);

        const outputNodes = data.nodes.filter((node) =>
            data.outputs.some((pin) => pin.id === node.id),
        );

        return Object.fromEntries(
            outputNodes.map((outputNode) => [
                outputNode.id,
                outputNode.data.simulator!.output["out"],
            ]),
        );
    }
}

const gap = 20;
const HandleGroup: FC<{ pins: PinDefinition[]; type: HandleType; position: Position }> = React.memo(
    ({ pins, type, position }) => {
        return (
            <>
                {pins.map((pin, index) => {
                    const handleStyle: CSSProperties = {
                        top: "50%",
                        transform: `translate(${position === Position.Left ? "-" : ""}50%, calc(${gap * index - (gap * (pins.length - 1)) / 2}px - 50%)`,
                    };

                    return (
                        <TooltipProvider key={pin.id} delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Handle
                                        id={pin.id}
                                        type={type}
                                        position={position}
                                        style={handleStyle}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>{pin.name}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
            </>
        );
    },
);

export const CustomNodeComponent = ({ selected, data }: NodeProps<CustomNode>) => {
    return (
        <>
            <BaseNode
                selected={selected}
                numberOfEdges={Math.max(data.inputs.length, data.outputs.length)}
            >
                {data.name}
            </BaseNode>
            <HandleGroup pins={data.inputs} type={"target"} position={Position.Left} />
            <HandleGroup pins={data.outputs} type={"source"} position={Position.Right} />
        </>
    );
};
