import { Handle, NodeProps, Position } from "@xyflow/react";

import { EdgeStates, LogicNode, LogicNodeData, LogicState, SimulatorNode } from "@/editor/types.ts";

import { BaseNode } from "./BaseNode.tsx";

export interface InputNodeData extends LogicNodeData {
    name: string;
    desiredState: LogicState;
}

export type InputNode = LogicNode<InputNodeData, "_input">;

export class InputSimulatorNode extends SimulatorNode {
    override calculateNewState(data: InputNodeData, _inputs: EdgeStates): EdgeStates {
        return {
            out: data.desiredState,
        };
    }
}

export const InputNodeComponent = ({ data, selected }: NodeProps<InputNode>) => {
    return (
        <>
            <BaseNode
                selected={selected}
                logicState={data.simulator?.output["out"]}
                className="!rounded-full font-extrabold"
            >
                {data.desiredState === "on" ? "1" : "0"}
            </BaseNode>
            <Handle id={"out"} type={"source"} position={Position.Right} />
        </>
    );
};
