import { Handle, NodeProps, Position } from "@xyflow/react";

import { EdgeStates, LogicNode, LogicNodeData, SimulatorNode } from "@/editor/types.ts";

import { BaseNode } from "./BaseNode.tsx";

export interface OutputNodeData extends LogicNodeData {
    name: string;
}

export type OutputNode = LogicNode<OutputNodeData, "_output">;

export class OutputSimulatorNode extends SimulatorNode {
    override calculateNewState(_: LogicNodeData, _inputs: EdgeStates): EdgeStates {
        return {
            out: _inputs["in"],
        };
    }
}

export const OutputNodeComponent = ({ data, selected }: NodeProps<OutputNode>) => {
    return (
        <>
            <BaseNode
                selected={selected}
                logicState={data.simulator?.output["out"]}
                className="!rounded-full font-extrabold"
            >
                {data.simulator?.output["out"] === "on" ? "1" : "0"}
            </BaseNode>
            <Handle id={"in"} type={"target"} position={Position.Left} />
        </>
    );
};
