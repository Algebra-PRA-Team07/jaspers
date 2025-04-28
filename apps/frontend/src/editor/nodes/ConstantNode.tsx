import { Handle, NodeProps, Position } from "@xyflow/react";

import { LogicNode, LogicNodeData, LogicState, SimulatorNode } from "../types.ts";
import { BaseNode } from "./BaseNode.tsx";

export interface ConstantNodeData extends LogicNodeData {
    desiredState: LogicState;
}

export type ConstantNode = LogicNode<ConstantNodeData, "constant">;

export class ConstantSimulatorNode extends SimulatorNode {
    override calculateNewState(data: ConstantNodeData, _inputs: LogicState[]): LogicState {
        return data.desiredState;
    }
}

export const ConstantNodeComponent = ({ data, selected }: NodeProps<ConstantNode>) => {
    return (
        <>
            <BaseNode
                selected={selected}
                logicState={data.simulator?.state}
                className="!rounded-full font-extrabold"
            >
                {data.desiredState === "on" ? "1" : "0"}
            </BaseNode>
            <Handle type={"source"} position={Position.Right} />
        </>
    );
};
