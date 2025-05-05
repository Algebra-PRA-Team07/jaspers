import { Handle, NodeProps, Position } from "@xyflow/react";

import { EdgeStates, LogicNode, LogicNodeData, LogicState, SimulatorNode } from "../types.ts";
import { BaseNode } from "./BaseNode.tsx";

export interface ConstantNodeData extends LogicNodeData {
    desiredState: LogicState;
}

export type ConstantNode = LogicNode<ConstantNodeData, "constant">;

export class ConstantSimulatorNode extends SimulatorNode {
    override calculateNewState(data: ConstantNodeData, _inputs: EdgeStates): EdgeStates {
        return {
            out: data.desiredState,
        };
    }
}

export const ConstantNodeComponent = ({ data, selected }: NodeProps<ConstantNode>) => {
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
