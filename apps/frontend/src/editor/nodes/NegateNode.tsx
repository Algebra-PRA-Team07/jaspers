import { Handle, NodeProps, Position } from "@xyflow/react";

import { BaseNode } from "@/editor/nodes/BaseNode.tsx";
import { EdgeStates, LogicNode, LogicNodeData, negate, SimulatorNode } from "@/editor/types.ts";

export type NegateNode = LogicNode<LogicNodeData, "negate">;

export class NegateSimulatorNode extends SimulatorNode {
    override calculateNewState(_: LogicNodeData, inputs: EdgeStates): EdgeStates {
        return { out: negate(inputs["in"]) };
    }
}

export const NegateNodeComponent = ({ selected, data }: NodeProps<NegateNode>) => {
    return (
        <>
            <BaseNode logicState={data.simulator?.output["out"]} selected={selected}>
                NOT
            </BaseNode>
            <Handle id={"in"} type="target" position={Position.Left} />
            <Handle id={"out"} type="source" position={Position.Right} />
        </>
    );
};
